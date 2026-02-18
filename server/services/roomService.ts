import { v4 as uuid } from "uuid";
import { matchService } from "./matchService.js";

interface Room {
  id: string;
  matchId: string;
  players: string[]; // socketIds
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
  createRoom(socketId: string): Room {
    const roomId = uuid();
    const match = matchService.createMatch();

    const room: Room = {
      id: roomId,
      matchId: match.getState().id,
      players: [socketId],
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
  // Remove Player
  // -------------------
  removePlayer(socketId: string) {
    const roomId = this.socketToRoom.get(socketId);
    if (!roomId) return;

    const room = this.rooms.get(roomId);
    if (!room) return;

    room.players = room.players.filter((id) => id !== socketId);
    this.socketToRoom.delete(socketId);

    if (room.players.length === 0) {
      matchService.removeMatch(room.matchId);
      this.rooms.delete(roomId);
    }
  }
}

export const roomService = new RoomService();
