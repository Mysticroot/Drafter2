import { Server, Socket } from "socket.io";
import { registerLobbyHandlers } from "./lobbyHandlers.js";
import { registerDraftHandlers } from "./draftHandlers.js";
import { registerResultHandlers } from "./resultHandlers.js";
import { roomService } from "../services/roomService.js";
import { playerService } from "../services/playerService.js";
// import { registerMatchHandlers } from "./matchHandlers.js"; // 👈 ADD

export default function registerSocketHandlers(io: Server) {
  io.on("connection", (socket: Socket) => {
    console.log("[SocketRegistry] connected", { socketId: socket.id });

    // Register feature handlers
    registerLobbyHandlers(io, socket);
    registerDraftHandlers(io, socket);
    registerResultHandlers(io, socket);
    // registerMatchHandlers(socket); // 👈 ADD

    socket.on("disconnect", () => {
      console.log("[SocketRegistry] disconnected", { socketId: socket.id });

      roomService.removePlayer(socket.id);
      playerService.removePlayer(socket.id);
    });
  });
}
