import { Server, Socket } from "socket.io";
import { roomService } from "../services/roomService.js";
import { matchService } from "../services/matchService.js";
import { playerService } from "../services/playerService.js";

export function registerResultHandlers(io: Server, socket: Socket) {
  socket.on("draft:swap", ({ roleA, roleB }) => {
    try {
      console.log("[Result] draft:swap received", {
        socketId: socket.id,
        roleA,
        roleB,
      });

      const room = roomService.getRoomBySocket(socket.id);
      if (!room) throw new Error("Room not found");

      const match = matchService.getMatch(room.matchId);
      if (!match) throw new Error("Match not found");

      const playerId = playerService.getPlayerId(socket.id);
      if (!playerId) throw new Error("Player not found");

      match.swap(playerId, roleA, roleB);

      console.log("[Result] draft:update emit after swap", {
        roomId: room.id,
        playerId,
        phase: match.getState().phase,
      });

      io.to(room.id).emit("draft:update", {
        matchState: match.getState(),
      });
    } catch (err) {
      console.error("[Result] draft:swap failed", {
        socketId: socket.id,
        roleA,
        roleB,
        message: (err as Error).message,
      });
      socket.emit("error", { message: (err as Error).message });
    }
  });

  socket.on("swap:finalize", () => {
    try {
      console.log("[Result] swap:finalize received", { socketId: socket.id });

      const room = roomService.getRoomBySocket(socket.id);
      if (!room) throw new Error("Room not found");

      const match = matchService.getMatch(room.matchId);
      if (!match) throw new Error("Match not found");

      const playerId = playerService.getPlayerId(socket.id);
      if (!playerId) throw new Error("Player not found");

      match.finalizeSwapPhase(playerId);

      console.log("[Result] match:update emit after finalize", {
        roomId: room.id,
        playerId,
        phase: match.getState().phase,
      });

      io.to(room.id).emit("match:update", {
        matchState: match.getState(),
      });
    } catch (err) {
      console.error("[Result] swap:finalize failed", {
        socketId: socket.id,
        message: (err as Error).message,
      });
      socket.emit("error", { message: (err as Error).message });
    }
  });
}
