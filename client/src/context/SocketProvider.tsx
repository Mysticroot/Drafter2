import { useEffect, useRef, useState } from "react";
import { socket } from "./Socket";
import { SocketContext } from "./SocketContext";
import type { MatchState } from "../types/game";

const ROOM_ID_KEY = "roomId";
const PLAYER_ID_KEY = "playerId";

const storage = {
  getRoomId: () => window.sessionStorage.getItem(ROOM_ID_KEY),
  getPlayerId: () => window.sessionStorage.getItem(PLAYER_ID_KEY),
  setRoomId: (value: string) =>
    window.sessionStorage.setItem(ROOM_ID_KEY, value),
  setPlayerId: (value: string) =>
    window.sessionStorage.setItem(PLAYER_ID_KEY, value),
  clear: () => {
    window.sessionStorage.removeItem(ROOM_ID_KEY);
    window.sessionStorage.removeItem(PLAYER_ID_KEY);
  },
};

export function SocketProvider({ children }: { children: React.ReactNode }) {
  const [matchState, setMatchState] = useState<MatchState | null>(null);
  const reconnectTimeoutRef = useRef<number | null>(null);

  const [roomId, setRoomId] = useState<string | null>(storage.getRoomId());

  const [playerId, setPlayerId] = useState<string | null>(
    storage.getPlayerId(),
  );

  const resetMatch = () => {
    console.log("[SocketProvider] resetMatch called");

    setMatchState(null);
    setRoomId(null);
    setPlayerId(null);

    storage.clear();
  };

  useEffect(() => {
    // Clear legacy shared storage keys so two tabs cannot reuse one identity.
    window.localStorage.removeItem(ROOM_ID_KEY);
    window.localStorage.removeItem(PLAYER_ID_KEY);

    const clearReconnectTimeout = () => {
      if (reconnectTimeoutRef.current !== null) {
        window.clearTimeout(reconnectTimeoutRef.current);
        reconnectTimeoutRef.current = null;
      }
    };

    const armReconnectTimeout = () => {
      clearReconnectTimeout();

      reconnectTimeoutRef.current = window.setTimeout(() => {
        console.warn(
          "[SocketProvider] reconnect timeout, clearing stale session",
        );
        resetMatch();
      }, 5000);
    };

    const attemptReconnect = () => {
      const roomId = storage.getRoomId();
      const playerId = storage.getPlayerId();

      if (roomId && playerId) {
        console.log("[SocketProvider] attempting reconnect", {
          socketId: socket.id,
          roomId,
          playerId,
        });

        armReconnectTimeout();

        socket.emit("player:reconnect", {
          roomId,
          playerId,
        });
      } else {
        console.log("[SocketProvider] no reconnect credentials found", {
          roomId,
          playerId,
        });
      }
    };

    const onConnect = () => {
      console.log("[SocketProvider] connected", { socketId: socket.id });
      attemptReconnect();
    };

    const onDisconnect = (reason: string) => {
      console.warn("[SocketProvider] disconnected", {
        socketId: socket.id,
        reason,
      });
    };

    const onRoomCreated = ({
      roomId,
      playerId,
    }: {
      roomId: string;
      playerId: string;
    }) => {
      console.log("[SocketProvider] room:created", {
        socketId: socket.id,
        roomId,
        playerId,
      });

      setRoomId(roomId);
      setPlayerId(playerId);

      storage.setRoomId(roomId);
      storage.setPlayerId(playerId);
    };

    const onPlayerReady = ({
      playerId,
      roomId,
    }: {
      playerId: string;
      roomId?: string;
    }) => {
      console.log("[SocketProvider] player:ready", {
        socketId: socket.id,
        roomId,
        playerId,
      });

      setPlayerId(playerId);

      if (roomId) {
        setRoomId(roomId);
        storage.setRoomId(roomId);
      }

      storage.setPlayerId(playerId);
    };

    const onMatchStateEvent = (
      source: "match:start" | "match:sync" | "draft:update" | "match:update",
      nextMatchState: MatchState,
    ) => {
      clearReconnectTimeout();

      const me = storage.getPlayerId();
      const myPlayer = me
        ? nextMatchState.players.find((p) => p.id === me)
        : undefined;

      console.log(`[SocketProvider] ${source}`, {
        socketId: socket.id,
        matchId: nextMatchState.id,
        phase: nextMatchState.phase,
        currentTurnPlayerId: nextMatchState.currentTurnPlayerId,
        me,
        mySocketInState: myPlayer?.socketId,
      });

      setMatchState(nextMatchState);
    };

    const onReconnectFailed = ({ message }: { message: string }) => {
      clearReconnectTimeout();
      console.error("[SocketProvider] reconnect:failed", {
        socketId: socket.id,
        message,
      });
      resetMatch();
    };

    const onServerError = ({ message }: { message: string }) => {
      console.error("[SocketProvider] server error", {
        socketId: socket.id,
        message,
      });

      const shouldReset =
        /room not found|player not found|match not found/i.test(message);

      if (shouldReset) {
        resetMatch();
      }
    };

    const onMatchStart = ({ matchState }: { matchState: MatchState }) =>
      onMatchStateEvent("match:start", matchState);

    const onMatchSync = ({ matchState }: { matchState: MatchState }) =>
      onMatchStateEvent("match:sync", matchState);

    const onDraftUpdate = ({ matchState }: { matchState: MatchState }) =>
      onMatchStateEvent("draft:update", matchState);

    const onMatchUpdate = ({ matchState }: { matchState: MatchState }) =>
      onMatchStateEvent("match:update", matchState);

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("room:created", onRoomCreated);
    socket.on("player:ready", onPlayerReady);
    socket.on("match:start", onMatchStart);
    socket.on("match:sync", onMatchSync);
    socket.on("draft:update", onDraftUpdate);
    socket.on("match:update", onMatchUpdate);
    socket.on("reconnect:failed", onReconnectFailed);
    socket.on("error", onServerError);

    if (!socket.connected) {
      console.log("[SocketProvider] connecting socket");
      socket.connect();
    } else {
      console.log("[SocketProvider] socket already connected", {
        socketId: socket.id,
      });
      attemptReconnect();
    }

    return () => {
      clearReconnectTimeout();
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("room:created", onRoomCreated);
      socket.off("player:ready", onPlayerReady);
      socket.off("reconnect:failed", onReconnectFailed);
      socket.off("error", onServerError);
      socket.off("match:start", onMatchStart);
      socket.off("match:sync", onMatchSync);
      socket.off("draft:update", onDraftUpdate);
      socket.off("match:update", onMatchUpdate);
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
