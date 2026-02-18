interface PlayerConnection {
  playerId: string;
  socketId: string;
}

class PlayerService {
  private socketToPlayer: Map<string, string>;
  private playerToSocket: Map<string, string>;

  constructor() {
    this.socketToPlayer = new Map();
    this.playerToSocket = new Map();
  }

  // -------------------
  // Register Player
  // -------------------
  registerPlayer(playerId: string, socketId: string) {
    this.socketToPlayer.set(socketId, playerId);
    this.playerToSocket.set(playerId, socketId);
  }

  // -------------------
  // Get PlayerId from socket
  // -------------------
  getPlayerId(socketId: string): string | undefined {
    return this.socketToPlayer.get(socketId);
  }

  // -------------------
  // Get SocketId from player
  // -------------------
  getSocketId(playerId: string): string | undefined {
    return this.playerToSocket.get(playerId);
  }

  // -------------------
  // Remove Player
  // -------------------
  removePlayer(socketId: string) {
    const playerId = this.socketToPlayer.get(socketId);

    if (!playerId) return;

    this.socketToPlayer.delete(socketId);
    this.playerToSocket.delete(playerId);
  }
}

export const playerService = new PlayerService();
