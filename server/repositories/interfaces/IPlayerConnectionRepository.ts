export interface IPlayerConnectionRepository {
  bindPlayerSocket(playerId: string, socketId: string): void;
  getPlayerIdBySocket(socketId: string): string | undefined;
  getSocketIdByPlayer(playerId: string): string | undefined;
  unbindSocket(socketId: string): void;
}
