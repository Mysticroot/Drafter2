import { Server, Socket } from "socket.io";
import { roomService } from "../services/roomService.js";
import { matchService } from "../services/matchService.js";
import { playerService } from "../services/playerService.js";

export function registerLobbyHandlers(io: Server, socket: Socket) {
  // -------------------
  // Create Room
  // -------------------
  socket.on("room:create", () => {
    try {
      const room = roomService.createRoom(socket.id);

      socket.join(room.id);

      const match = matchService.getMatch(room.matchId);
      if (!match) throw new Error("Match not found");

      const player = match.getState().players[0];
      playerService.registerPlayer(player.id, socket.id);

      socket.emit("room:created", {
        roomId: room.id,
        playerId: player.id,
      });

      console.log("🏠 Room created:", room.id);
    } catch (err) {
      socket.emit("error", { message: (err as Error).message });
    }
  });

  // -------------------
  // Join Room
  // -------------------
  socket.on("room:join", ({ roomId }) => {
    try {
      const room = roomService.joinRoom(roomId, socket.id);

      socket.join(room.id);

      const match = matchService.getMatch(room.matchId);
      if (!match) throw new Error("Match not found");

      const player = match
        .getState()
        .players.find((p) => p.socketId === socket.id);

      if (!player) throw new Error("Player not found");

      playerService.registerPlayer(player.id, socket.id);

      io.to(room.id).emit("match:start", {
        matchState: match.getState(),
      });

      console.log("👥 Player joined room:", room.id);
    } catch (err) {
      socket.emit("error", { message: (err as Error).message });
    }
  });
}
