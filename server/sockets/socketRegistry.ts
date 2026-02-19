  import { Server, Socket } from "socket.io";
  import { registerLobbyHandlers } from "./lobbyHandlers.js";
  import { registerDraftHandlers } from "./draftHandlers.js";
  import { registerResultHandlers } from "./resultHandlers.js";
  import { roomService } from "../services/roomService.js";
  import { playerService } from "../services/playerService.js";

  export default function registerSocketHandlers(io: Server) {
    io.on("connection", (socket: Socket) => {
      console.log("🔌 Connected:", socket.id);

      // Register feature handlers
      registerLobbyHandlers(io, socket);
      registerDraftHandlers(io, socket);
      registerResultHandlers(io, socket);

      socket.on("disconnect", () => {
        console.log("❌ Disconnected:", socket.id);

        roomService.removePlayer(socket.id);
        playerService.removePlayer(socket.id);
      });
    });
  }
