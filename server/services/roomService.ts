import { v4 as uuid } from "uuid";
import { matchService } from "./matchService.js";
import { getDeckCardCount } from "../game/deck.js";

const MIN_DECK_SIZE = 10;

interface Room {
  id: string;
  matchId: string;
  players: string[]; // socketIds
  selectedAnimes: string[];
}

class RoomService {
  private rooms: Map<string, Room>;
  private socketToRoom: Map<string, string>;

  constructor() {
    this.rooms = new Map();
    this.socketToRoom = new Map();
  }

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

    this.rooms.set(roomId, room);
    this.socketToRoom.set(socketId, roomId);

    match.addPlayer(socketId);

    return room;
  }

  // -------------------
  // Join Room
  // -------------------
  joinRoom(roomId: string, socketId: string): Room {
    const room = this.rooms.get(roomId);

    if (!room) {
      throw new Error("Room not found");
    }

    if (room.players.length >= 2) {
      throw new Error("Room is full");
    }

    room.players.push(socketId);
    this.socketToRoom.set(socketId, roomId);

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
    const roomId = this.socketToRoom.get(socketId);
    if (!roomId) return undefined;

    return this.rooms.get(roomId);
  }

  // -------------------
  // Get Room
  // -------------------
  getRoom(roomId: string): Room | undefined {
    return this.rooms.get(roomId);
  }

  // -------------------
  // Rebind Socket To Room
  // -------------------
  rebindSocket(roomId: string, previousSocketId: string, newSocketId: string) {
    const room = this.rooms.get(roomId);
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

    this.socketToRoom.delete(previousSocketId);
    this.socketToRoom.set(newSocketId, roomId);

    console.log("[RoomService] rebindSocket done", {
      roomId,
      roomPlayersAfter: [...room.players],
    });
  }

  // -------------------
  // Remove Player
  // -------------------
  removePlayer(socketId: string) {
    const roomId = this.socketToRoom.get(socketId);
    if (!roomId) return;

    const room = this.rooms.get(roomId);
    if (!room) return;

    console.log("Removing player socket:", socketId);

    console.log("[RoomService] removePlayer start", {
      roomId,
      socketId,
      roomPlayersBefore: [...room.players],
    });

    room.players = room.players.filter((id) => id !== socketId);

    this.socketToRoom.delete(socketId);

    console.log("[RoomService] removePlayer done", {
      roomId,
      roomPlayersAfter: [...room.players],
    });

    // DO NOT delete room immediately
    // allow reconnect window

    setTimeout(() => {
      const r = this.rooms.get(roomId);
      if (!r) return;

      if (r.players.length > 0) {
        console.log("Player already reconnected, keeping room", {
          roomId,
          roomPlayers: [...r.players],
        });
        return;
      }

      console.log("Deleting empty room:", roomId);

      matchService.removeMatch(r.matchId);
      this.rooms.delete(roomId);
    }, 15000);
  }
}

export const roomService = new RoomService();
