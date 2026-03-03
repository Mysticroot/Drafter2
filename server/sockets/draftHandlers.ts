import { Server, Socket } from "socket.io";
import { roomService } from "../services/roomService.js";
import { matchService } from "../services/matchService.js";
import { playerService } from "../services/playerService.js";

export function registerDraftHandlers(io: Server, socket: Socket) {
  socket.on("draft:draw", () => {
    try {
      console.log("📥 [BACKEND] draft:draw received from", socket.id);

      const room = roomService.getRoomBySocket(socket.id);
      if (!room) throw new Error("Room not found");
      console.log("🏠 [BACKEND] Room found:", room.id);

      const match = matchService.getMatch(room.matchId);
      if (!match) throw new Error("Match not found");
      console.log("🎮 [BACKEND] Match found:", room.matchId);

      const playerId = playerService.getPlayerId(socket.id);
      if (!playerId) throw new Error("Player not found");
      console.log("👤 [BACKEND] Player ID:", playerId);

      console.log("🃏 [BACKEND] Calling match.draw()");
      match.draw(playerId);

      console.log("📡 [BACKEND] Emitting draft:update");

      io.to(room.id).emit("draft:update", {
        matchState: match.getState(),
      });
    } catch (err) {
      console.log("❌ [BACKEND] Error:", (err as Error).message);
      socket.emit("error", { message: (err as Error).message });
    }
  });

  socket.on("draft:assign", ({ role }) => {
    try {
      const room = roomService.getRoomBySocket(socket.id);
      if (!room) throw new Error("Room not found");

      const match = matchService.getMatch(room.matchId);
      if (!match) throw new Error("Match not found");

      const playerId = playerService.getPlayerId(socket.id);
      if (!playerId) throw new Error("Player not found");

      match.assign(playerId, role);

      io.to(room.id).emit("draft:update", {
        matchState: match.getState(),
      });
    } catch (err) {
      socket.emit("error", { message: (err as Error).message });
    }
  });

  socket.on("draft:skip", () => {
    try {
      const room = roomService.getRoomBySocket(socket.id);
      if (!room) throw new Error("Room not found");

      const match = matchService.getMatch(room.matchId);
      if (!match) throw new Error("Match not found");

      const playerId = playerService.getPlayerId(socket.id);
      if (!playerId) throw new Error("Player not found");

      match.skip(playerId);

      io.to(room.id).emit("draft:update", {
        matchState: match.getState(),
      });
    } catch (err) {
      socket.emit("error", { message: (err as Error).message });
    }
  });

  socket.on("draft:swap", ({ roleA, roleB }) => {
    try {
      const room = roomService.getRoomBySocket(socket.id);
      if (!room) throw new Error("Room not found");

      const match = matchService.getMatch(room.matchId);
      if (!match) throw new Error("Match not found");

      const playerId = playerService.getPlayerId(socket.id);
      if (!playerId) throw new Error("Player not found");

      match.swap(playerId, roleA, roleB);

      io.to(room.id).emit("draft:update", {
        matchState: match.getState(),
      });
    } catch (err) {
      socket.emit("error", { message: (err as Error).message });
    }
  });

  
}
