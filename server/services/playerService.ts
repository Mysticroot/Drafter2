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
    const previousSocketId = this.playerToSocket.get(playerId);

    if (previousSocketId && previousSocketId !== socketId) {
      this.socketToPlayer.delete(previousSocketId);
    }

    this.socketToPlayer.set(socketId, playerId);
    this.playerToSocket.set(playerId, socketId);

    console.log("[PlayerService] registerPlayer", {
      playerId,
      socketId,
      previousSocketId,
    });
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

    console.log("[PlayerService] removePlayer start", {
      socketId,
      playerId,
    });

    this.socketToPlayer.delete(socketId);

    // Avoid deleting a newer socket mapping for the same player.
    if (this.playerToSocket.get(playerId) === socketId) {
      this.playerToSocket.delete(playerId);
    }

    console.log("[PlayerService] removePlayer done", {
      socketId,
      playerId,
      remainingSocketForPlayer: this.playerToSocket.get(playerId),
    });
  }
}

export const playerService = new PlayerService();
