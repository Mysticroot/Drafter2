import { createContext } from "react";
import type { Socket } from "socket.io-client";
import type { MatchState } from "../types/game";

/**
 * SocketContextValue
 * Minimal contract for v1
 */
export interface SocketContextValue {
  socket: Socket | null;
  matchState: MatchState | null;
  roomId: string | null;
}

export const SocketContext = createContext<SocketContextValue>({
  socket: null,
  matchState: null,
  roomId: null,
});
