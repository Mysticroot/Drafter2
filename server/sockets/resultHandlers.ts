import { Server, Socket } from "socket.io";
import { roomService } from "../services/roomService.js";
import { matchService } from "../services/matchService.js";
import { playerService } from "../services/playerService.js";

export function registerResultHandlers(io: Server, socket: Socket) {
  socket.on("swap:roles", ({ roleA, roleB }) => {
    try {
      const room = roomService.getRoomBySocket(socket.id);
      if (!room) throw new Error("Room not found");

      const match = matchService.getMatch(room.matchId);
      if (!match) throw new Error("Match not found");

      const playerId = playerService.getPlayerId(socket.id);
      if (!playerId) throw new Error("Player not found");

      match.swap(playerId, roleA, roleB);

      io.to(room.id).emit("swap:update", {
        matchState: match.getState(),
      });
    } catch (err) {
      socket.emit("error", { message: (err as Error).message });
    }
  });

  socket.on("swap:finalize", () => {
    try {
      const room = roomService.getRoomBySocket(socket.id);
      if (!room) throw new Error("Room not found");

      const match = matchService.getMatch(room.matchId);
      if (!match) throw new Error("Match not found");

      const playerId = playerService.getPlayerId(socket.id);
      if (!playerId) throw new Error("Player not found");

      match.finalizeSwapPhase(playerId);

      io.to(room.id).emit("match:update", {
        matchState: match.getState(),
      });
    } catch (err) {
      socket.emit("error", { message: (err as Error).message });
    }
  });
}
