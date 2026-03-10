import type { IPlayerConnectionRepository } from "../interfaces/IPlayerConnectionRepository.js";

export class InMemoryPlayerConnectionRepository
  implements IPlayerConnectionRepository
{
  private readonly socketToPlayer = new Map<string, string>();
  private readonly playerToSocket = new Map<string, string>();

  bindPlayerSocket(playerId: string, socketId: string): void {
    const previousSocketId = this.playerToSocket.get(playerId);

    if (previousSocketId && previousSocketId !== socketId) {
      this.socketToPlayer.delete(previousSocketId);
    }

    this.socketToPlayer.set(socketId, playerId);
    this.playerToSocket.set(playerId, socketId);
  }

  getPlayerIdBySocket(socketId: string): string | undefined {
    return this.socketToPlayer.get(socketId);
  }

  getSocketIdByPlayer(playerId: string): string | undefined {
    return this.playerToSocket.get(playerId);
  }

  unbindSocket(socketId: string): void {
    const playerId = this.socketToPlayer.get(socketId);
    if (!playerId) return;

    this.socketToPlayer.delete(socketId);

    if (this.playerToSocket.get(playerId) === socketId) {
      this.playerToSocket.delete(playerId);
    }
  }
}
