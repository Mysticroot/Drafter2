// server/sockets/matchHandlers.ts
import { Socket } from "socket.io";
import { roomService } from "../services/roomService.js";
import { matchService } from "../services/matchService.js";

export function registerMatchHandlers(socket: Socket) {
  socket.on("match:get", () => {
    const room = roomService.getRoomBySocket(socket.id);
    if (!room) return;

    const match = matchService.getMatch(room.matchId);
    if (!match) return;

    socket.emit("match:update", {
      matchState: match.getState(),
    });
  });
}
