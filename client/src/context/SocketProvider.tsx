import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { SocketContext } from "./SocketContext";
import type { MatchState } from "../types/game";

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const [socket] = useState<Socket>(() =>
    io("http://localhost:5000", {
      transports: ["websocket", "polling"],
    }),
  );

  const [matchState, setMatchState] = useState<MatchState | null>(null);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [playerId, setPlayerId] = useState<string | null>(null);
useEffect(() => {
  socket.on("connect", () => {
    console.log("✅ Socket connected:", socket.id);
  });

  socket.on("room:created", ({ roomId, playerId }) => {
    setRoomId(roomId);
    setPlayerId(playerId);
  });

  // ✅ JOINER RECEIVES PLAYER ID HERE
  socket.on("player:ready", ({ playerId }) => {
    setPlayerId(playerId);
  });

  socket.on("match:start", ({ matchState }) => {
    setMatchState(matchState);
  });

  socket.on("draft:update", ({ matchState }) => {
    console.log("📥 [FRONTEND] draft:update received");
    console.log("📦 [FRONTEND] matchState:", matchState);
    setMatchState(matchState);
  });

  socket.on("match:update", ({ matchState }) => {
    console.log("📥 [FRONTEND] match:update received");
    console.log("📦 [FRONTEND] new phase:", matchState.phase);
    setMatchState(matchState);
  });

  return () => {
    socket.off();
  };
}, [socket]);

  return (
    <SocketContext.Provider
      value={{
        socket,
        matchState,
        roomId,
        playerId,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}
