import { useEffect, useState } from "react";
import { socket } from "./Socket";
import { SocketContext } from "./SocketContext";
import type { MatchState } from "../types/game";

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const [matchState, setMatchState] = useState<MatchState | null>(null);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [playerId, setPlayerId] = useState<string | null>(null);

  const resetMatch = () => {
    setMatchState(null);
    setRoomId(null);
    setPlayerId(null);
  };

  useEffect(() => {
    console.log("🔌 socket ready:", socket.id);

    socket.on("connect", () => {
      console.log("✅ connected:", socket.id);
    });

    socket.on("room:created", ({ roomId, playerId }) => {
      setRoomId(roomId);
      setPlayerId(playerId);
    });

    socket.on("player:ready", ({ playerId }) => {
      setPlayerId(playerId);
    });

    socket.on("match:start", ({ matchState }) => {
      setMatchState(matchState);
    });

    socket.on("draft:update", ({ matchState }) => {
      setMatchState(matchState);
    });

    socket.on("match:update", ({ matchState }) => {
      setMatchState(matchState);
    });

    return () => {
      socket.off();
    };
  }, []);

  return (
    <SocketContext.Provider
      value={{
        socket,
        matchState,
        roomId,
        playerId,
        resetMatch,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}
