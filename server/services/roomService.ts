import { v4 as uuid } from "uuid";
import { matchService } from "./matchService.js";
import { getDeckCardCount } from "../game/deck.js";
import { repositories } from "../repositories/index.js";
import type { RoomRecord } from "../repositories/types/entities.js";

const MIN_DECK_SIZE = 10;

type Room = RoomRecord;

class RoomService {
  // -------------------
  // Create Room
  // -------------------
  createRoom(socketId: string, selectedAnimes: string[] = []): Room {
    const deckCardCount = getDeckCardCount(selectedAnimes);

    if (deckCardCount < MIN_DECK_SIZE) {
      throw new Error(
        `Selected franchises create only ${deckCardCount} cards. Choose at least ${MIN_DECK_SIZE} cards before creating a room.`,
      );
    }

    const roomId = uuid();
    const match = matchService.createMatch(selectedAnimes);

    const room: Room = {
      id: roomId,
      matchId: match.getState().id,
      players: [socketId],
      selectedAnimes,
    };

    repositories.room.save(room);
    repositories.room.bindSocketToRoom(socketId, roomId);

    match.addPlayer(socketId);

    return room;
  }

  // -------------------
  // Join Room
  // -------------------
  joinRoom(roomId: string, socketId: string): Room {
    const room = repositories.room.getById(roomId);

    if (!room) {
      throw new Error("Room not found");
    }

    if (room.players.length >= 2) {
      throw new Error("Room is full");
    }

    room.players.push(socketId);
    repositories.room.bindSocketToRoom(socketId, roomId);

    const match = matchService.getMatch(room.matchId);

    if (!match) {
      throw new Error("Match not found");
    }

    match.addPlayer(socketId);

    return room;
  }

  // -------------------
  // Get Room By Socket
  // -------------------
  getRoomBySocket(socketId: string): Room | undefined {
    return repositories.room.getBySocket(socketId);
  }

  // -------------------
  // Get Room
  // -------------------
  getRoom(roomId: string): Room | undefined {
    return repositories.room.getById(roomId);
  }

  // -------------------
  // Rebind Socket To Room
  // -------------------
  rebindSocket(roomId: string, previousSocketId: string, newSocketId: string) {
    const room = repositories.room.getById(roomId);
    if (!room) return;

    console.log("[RoomService] rebindSocket start", {
      roomId,
      previousSocketId,
      newSocketId,
      roomPlayersBefore: [...room.players],
    });

    const index = room.players.findIndex((id) => id === previousSocketId);

    if (index >= 0) {
      room.players[index] = newSocketId;
    } else if (!room.players.includes(newSocketId)) {
      room.players.push(newSocketId);
    }

    repositories.room.unbindSocket(previousSocketId);
    repositories.room.bindSocketToRoom(newSocketId, roomId);

    console.log("[RoomService] rebindSocket done", {
      roomId,
      roomPlayersAfter: [...room.players],
    });
  }

  // -------------------
  // Remove Player
  // -------------------
  removePlayer(socketId: string) {
    const roomId = repositories.room.getRoomIdBySocket(socketId);
    if (!roomId) return;

    const room = repositories.room.getById(roomId);
    if (!room) return;

    console.log("Removing player socket:", socketId);

    console.log("[RoomService] removePlayer start", {
      roomId,
      socketId,
      roomPlayersBefore: [...room.players],
    });

    room.players = room.players.filter((id) => id !== socketId);

    repositories.room.unbindSocket(socketId);

    console.log("[RoomService] removePlayer done", {
      roomId,
      roomPlayersAfter: [...room.players],
    });

    // DO NOT delete room immediately
    // allow reconnect window

    setTimeout(() => {
      const activeRoom = repositories.room.getById(roomId);
      if (!activeRoom) return;

      if (activeRoom.players.length > 0) {
        console.log("Player already reconnected, keeping room", {
          roomId,
          roomPlayers: [...activeRoom.players],
        });
        return;
      }

      console.log("Deleting empty room:", roomId);

      matchService.removeMatch(activeRoom.matchId);
      repositories.room.delete(roomId);
    }, 15000);
  }

  // -------------------
  // Close Room Immediately
  // -------------------
  closeRoom(roomId: string) {
    const room = repositories.room.getById(roomId);
    if (!room) return;

    console.log("[RoomService] closeRoom", {
      roomId,
      matchId: room.matchId,
      players: [...room.players],
    });

    for (const socketId of room.players) {
      repositories.room.unbindSocket(socketId);
    }

    matchService.removeMatch(room.matchId);
    repositories.room.delete(roomId);
  }
}

export const roomService = new RoomService();
