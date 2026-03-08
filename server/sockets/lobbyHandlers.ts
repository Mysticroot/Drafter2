import { Server, Socket } from "socket.io";
import { roomService } from "../services/roomService.js";
import { matchService } from "../services/matchService.js";
import { playerService } from "../services/playerService.js";

export function registerLobbyHandlers(io: Server, socket: Socket) {
  /* ---------------- CREATE ROOM ---------------- */

  socket.on("room:create", (payload?: { animes?: string[] }) => {
    try {
      console.log("[Lobby] room:create", {
        socketId: socket.id,
        selectedAnimes: payload?.animes ?? [],
      });

      const room = roomService.createRoom(socket.id, payload?.animes ?? []);

      socket.join(room.id);

      const match = matchService.getMatch(room.matchId);
      if (!match) throw new Error("Match not found");

      const player = match.getState().players[0];

      playerService.registerPlayer(player.id, socket.id);

      socket.emit("room:created", {
        roomId: room.id,
        playerId: player.id,
      });

      console.log("[Lobby] room:created emitted", {
        roomId: room.id,
        matchId: room.matchId,
        playerId: player.id,
        socketId: socket.id,
      });
    } catch (err) {
      console.error("[Lobby] room:create failed", {
        socketId: socket.id,
        message: (err as Error).message,
      });
      socket.emit("error", { message: (err as Error).message });
    }
  });

  /* ---------------- JOIN ROOM ---------------- */

  socket.on("room:join", ({ roomId }) => {
    try {
      console.log("[Lobby] room:join", { socketId: socket.id, roomId });

      const room = roomService.joinRoom(roomId, socket.id);

      socket.join(room.id);

      const match = matchService.getMatch(room.matchId);
      if (!match) throw new Error("Match not found");

      const player = match
        .getState()
        .players.find((p) => p.socketId === socket.id);

      if (!player) throw new Error("Player not found");

      playerService.registerPlayer(player.id, socket.id);

      socket.emit("player:ready", {
        playerId: player.id,
        roomId: room.id,
      });

      io.to(room.id).emit("match:start", {
        matchState: match.getState(),
      });

      console.log("[Lobby] match:start emitted", {
        roomId: room.id,
        matchId: room.matchId,
        joinedPlayerId: player.id,
        currentTurnPlayerId: match.getState().currentTurnPlayerId,
      });
    } catch (err) {
      console.error("[Lobby] room:join failed", {
        socketId: socket.id,
        roomId,
        message: (err as Error).message,
      });
      socket.emit("error", { message: (err as Error).message });
    }
  });

  /* ---------------- PLAYER RECONNECT ---------------- */

  socket.on("player:reconnect", ({ roomId, playerId }) => {
    try {
      console.log("♻️ reconnect attempt:", roomId, playerId);

      const room = roomService.getRoom(roomId);

      if (!room) {
        socket.emit("reconnect:failed", { message: "Room not found" });
        return;
      }

      const match = matchService.getMatch(room.matchId);

      if (!match) {
        socket.emit("reconnect:failed", { message: "Match not found" });
        return;
      }

      const state = match.getState();

      const player = state.players.find((p) => p.id === playerId);

      if (!player) {
        socket.emit("reconnect:failed", { message: "Player not found" });
        return;
      }

      const existingSocketForPlayer = playerService.getSocketId(playerId);

      if (
        existingSocketForPlayer &&
        existingSocketForPlayer !== socket.id &&
        existingSocketForPlayer !== player.socketId
      ) {
        console.warn("[Lobby] reconnect claim conflict", {
          roomId,
          playerId,
          incomingSocketId: socket.id,
          existingSocketForPlayer,
          stateSocketForPlayer: player.socketId,
        });
      }

      const previousSocketId = player.socketId;

      player.socketId = socket.id;
      roomService.rebindSocket(roomId, previousSocketId, socket.id);
      playerService.registerPlayer(player.id, socket.id);

      socket.join(roomId);

      console.log("[Lobby] player restored", {
        roomId,
        playerId,
        previousSocketId,
        newSocketId: socket.id,
        currentTurnPlayerId: state.currentTurnPlayerId,
      });

      socket.emit("match:sync", {
        matchState: state,
      });

      console.log("[Lobby] match:sync emitted", {
        roomId,
        playerId,
        phase: state.phase,
      });
    } catch (err) {
      console.error("Reconnect error:", err);
      socket.emit("reconnect:failed", {
        message: "Reconnect failed unexpectedly",
      });
    }
  });
}
