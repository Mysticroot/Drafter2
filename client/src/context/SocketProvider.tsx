import { useEffect, useState, useMemo } from "react";
import { io, Socket } from "socket.io-client";
import { SocketContext } from "./SocketContext";
import type { MatchState } from "../types/game";

interface MatchUpdatePayload {
  matchState: MatchState;
}

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [matchState, setMatchState] = useState<MatchState | null>(null);

  useEffect(() => {
    const s = io("http://localhost:5000");
    setSocket(s);

    s.on("match:start", (d: MatchUpdatePayload) => setMatchState(d.matchState));
    s.on("draft:update", (d: MatchUpdatePayload) =>
      setMatchState(d.matchState),
    );
    s.on("swap:update", (d: MatchUpdatePayload) => setMatchState(d.matchState));
    s.on("match:update", (d: MatchUpdatePayload) =>
      setMatchState(d.matchState),
    );

    s.on("error", (e: unknown) => {
      if (typeof e === "object" && e && "message" in e) {
        console.error("Server:", (e as { message: string }).message);
      }
    });

    return () => {
      s.disconnect();
    };
  }, []);

  const value = useMemo(() => ({ socket, matchState }), [socket, matchState]);

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
}
