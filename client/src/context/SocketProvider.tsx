import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { SocketContext } from "./SocketContext";
import type { MatchState } from "../types/game";

interface MatchStartPayload {
  matchState: MatchState;
}

interface RoomPayload {
  roomId: string;
}

export function SocketProvider({ children }: { children: React.ReactNode }) {
  // create socket once
  const [socket] = useState<Socket>(() =>
    io("http://localhost:5000", {
      transports: ["websocket", "polling"], // important fallback
    }),
  );

  const [matchState, setMatchState] = useState<MatchState | null>(null);
  const [roomId, setRoomId] = useState<string | null>(null);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("✅ Socket connected:", socket.id);
    });

    socket.on("connect_error", (err) => {
      console.error("❌ Socket connect error:", err.message);
    });

    socket.on("room:created", (data: RoomPayload) => {
      console.log("ROOM CREATED EVENT:", data);
      setRoomId(data.roomId);
    });

    socket.on("match:start", (data: MatchStartPayload) => {
      setMatchState(data.matchState);
    });

    return () => {
      // IMPORTANT: do NOT disconnect here in dev strict mode
      socket.off();
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={{ socket, matchState, roomId }}>
      {children}
    </SocketContext.Provider>
  );
}
