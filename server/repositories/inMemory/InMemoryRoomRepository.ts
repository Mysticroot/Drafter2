import type { IRoomRepository } from "../interfaces/IRoomRepository.js";
import type { RoomRecord } from "../types/entities.js";

export class InMemoryRoomRepository implements IRoomRepository {
  private readonly rooms = new Map<string, RoomRecord>();
  private readonly socketToRoom = new Map<string, string>();

  save(room: RoomRecord): void {
    this.rooms.set(room.id, room);
  }

  getById(roomId: string): RoomRecord | undefined {
    return this.rooms.get(roomId);
  }

  getBySocket(socketId: string): RoomRecord | undefined {
    const roomId = this.socketToRoom.get(socketId);
    if (!roomId) return undefined;
    return this.rooms.get(roomId);
  }

  bindSocketToRoom(socketId: string, roomId: string): void {
    this.socketToRoom.set(socketId, roomId);
  }

  unbindSocket(socketId: string): void {
    this.socketToRoom.delete(socketId);
  }

  getRoomIdBySocket(socketId: string): string | undefined {
    return this.socketToRoom.get(socketId);
  }

  delete(roomId: string): void {
    this.rooms.delete(roomId);
  }
}
