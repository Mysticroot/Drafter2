import { Server, Socket } from "socket.io";
import { roomService } from "../services/roomService.js";
import { matchService } from "../services/matchService.js";
import { playerService } from "../services/playerService.js";

export function registerDraftHandlers(io: Server, socket: Socket) {
  socket.on("draft:draw", () => {
    try {
      console.log("[Draft] draft:draw received", { socketId: socket.id });

      const room = roomService.getRoomBySocket(socket.id);
      if (!room) throw new Error("Room not found");
      console.log("[Draft] room resolved", {
        roomId: room.id,
        socketId: socket.id,
      });

      const match = matchService.getMatch(room.matchId);
      if (!match) throw new Error("Match not found");
      console.log("[Draft] match resolved", {
        matchId: room.matchId,
        phase: match.getState().phase,
        currentTurnPlayerId: match.getState().currentTurnPlayerId,
      });

      const playerId = playerService.getPlayerId(socket.id);
      if (!playerId) throw new Error("Player not found");
      console.log("[Draft] player resolved", { socketId: socket.id, playerId });

      match.draw(playerId);

      console.log("[Draft] draft:update emit after draw", {
        roomId: room.id,
        currentTurnPlayerId: match.getState().currentTurnPlayerId,
      });

      io.to(room.id).emit("draft:update", {
        matchState: match.getState(),
      });
    } catch (err) {
      console.error("[Draft] draft:draw failed", {
        socketId: socket.id,
        message: (err as Error).message,
      });
      socket.emit("error", { message: (err as Error).message });
    }
  });

  socket.on("draft:assign", ({ role }) => {
    try {
      console.log("[Draft] draft:assign received", {
        socketId: socket.id,
        role,
      });

      const room = roomService.getRoomBySocket(socket.id);
      if (!room) throw new Error("Room not found");

      const match = matchService.getMatch(room.matchId);
      if (!match) throw new Error("Match not found");

      const playerId = playerService.getPlayerId(socket.id);
      if (!playerId) throw new Error("Player not found");

      match.assign(playerId, role);

      console.log("[Draft] draft:update emit after assign", {
        roomId: room.id,
        playerId,
        currentTurnPlayerId: match.getState().currentTurnPlayerId,
      });

      io.to(room.id).emit("draft:update", {
        matchState: match.getState(),
      });
    } catch (err) {
      console.error("[Draft] draft:assign failed", {
        socketId: socket.id,
        role,
        message: (err as Error).message,
      });
      socket.emit("error", { message: (err as Error).message });
    }
  });

  socket.on("draft:skip", () => {
    try {
      console.log("[Draft] draft:skip received", { socketId: socket.id });

      const room = roomService.getRoomBySocket(socket.id);
      if (!room) throw new Error("Room not found");

      const match = matchService.getMatch(room.matchId);
      if (!match) throw new Error("Match not found");

      const playerId = playerService.getPlayerId(socket.id);
      if (!playerId) throw new Error("Player not found");

      match.skip(playerId);

      console.log("[Draft] draft:update emit after skip", {
        roomId: room.id,
        playerId,
        currentTurnPlayerId: match.getState().currentTurnPlayerId,
      });

      io.to(room.id).emit("draft:update", {
        matchState: match.getState(),
      });
    } catch (err) {
      console.error("[Draft] draft:skip failed", {
        socketId: socket.id,
        message: (err as Error).message,
      });
      socket.emit("error", { message: (err as Error).message });
    }
  });
}
