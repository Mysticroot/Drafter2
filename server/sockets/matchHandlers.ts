// server/sockets/matchHandlers.ts
import { Server, Socket } from "socket.io";
import { roomService } from "../services/roomService.js";
import { matchService } from "../services/matchService.js";
import { playerService } from "../services/playerService.js";

export function registerMatchHandlers(io: Server, socket: Socket) {
  socket.on("match:get", () => {
    const room = roomService.getRoomBySocket(socket.id);
    if (!room) return;

    const match = matchService.getMatch(room.matchId);
    if (!match) return;

    socket.emit("match:update", {
      matchState: match.getState(),
    });
  });

  socket.on("match:exit", () => {
    try {
      const room = roomService.getRoomBySocket(socket.id);
      if (!room) throw new Error("Room not found");

      const playerId = playerService.getPlayerId(socket.id);
      const opponentSocketIds = room.players.filter((id) => id !== socket.id);

      console.log("[Match] match:exit", {
        roomId: room.id,
        socketId: socket.id,
        playerId,
        opponentSocketIds,
      });

      io.to(socket.id).emit("match:ended", {
        message: "You left the match. Returning to lobby.",
      });

      for (const opponentSocketId of opponentSocketIds) {
        io.to(opponentSocketId).emit("match:ended", {
          message: "Opponent left the match. Returning to lobby.",
        });
      }

      // Give outbound packets a small window before tearing room/match down.
      setTimeout(() => {
        io.in(room.id).socketsLeave(room.id);
        roomService.closeRoom(room.id);
      }, 100);

      if (playerId) {
        playerService.removePlayer(socket.id);
      }
    } catch (err) {
      console.error("[Match] match:exit failed", {
        socketId: socket.id,
        message: (err as Error).message,
      });
      socket.emit("error", { message: (err as Error).message });
    }
  });
}
