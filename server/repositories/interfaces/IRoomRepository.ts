import type { RoomRecord } from "../types/entities.js";

export interface IRoomRepository {
  save(room: RoomRecord): void;
  getById(roomId: string): RoomRecord | undefined;
  getBySocket(socketId: string): RoomRecord | undefined;
  bindSocketToRoom(socketId: string, roomId: string): void;
  unbindSocket(socketId: string): void;
  getRoomIdBySocket(socketId: string): string | undefined;
  delete(roomId: string): void;
}
