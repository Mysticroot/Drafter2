import { repositories } from "../repositories/index.js";

class PlayerService {
  // -------------------
  // Register Player
  // -------------------
  registerPlayer(playerId: string, socketId: string) {
    const previousSocketId = repositories.playerConnection.getSocketIdByPlayer(
      playerId,
    );

    repositories.playerConnection.bindPlayerSocket(playerId, socketId);

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
    return repositories.playerConnection.getPlayerIdBySocket(socketId);
  }

  // -------------------
  // Get SocketId from player
  // -------------------
  getSocketId(playerId: string): string | undefined {
    return repositories.playerConnection.getSocketIdByPlayer(playerId);
  }

  // -------------------
  // Remove Player
  // -------------------
  removePlayer(socketId: string) {
    const playerId = repositories.playerConnection.getPlayerIdBySocket(socketId);

    if (!playerId) return;

    console.log("[PlayerService] removePlayer start", {
      socketId,
      playerId,
    });

    repositories.playerConnection.unbindSocket(socketId);

    console.log("[PlayerService] removePlayer done", {
      socketId,
      playerId,
      remainingSocketForPlayer:
        repositories.playerConnection.getSocketIdByPlayer(playerId),
    });
  }
}

export const playerService = new PlayerService();
