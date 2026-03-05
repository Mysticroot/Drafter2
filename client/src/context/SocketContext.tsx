import { createContext } from "react";
import type { Socket } from "socket.io-client";
import type { MatchState } from "../types/game";

export interface SocketContextValue {
  socket: Socket | null;
  matchState: MatchState | null;
  roomId: string | null;
  playerId: string | null;
  resetMatch: () => void;
}

export const SocketContext = createContext<SocketContextValue>({
  socket: null,
  matchState: null,
  roomId: null,
  playerId: null,
  resetMatch: () => {},
});
