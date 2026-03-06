import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useSocket } from "../hooks/useSocket";

export default function LobbyPage() {
  const { socket, roomId, matchState } = useSocket();
  const [roomIdInput, setRoomIdInput] = useState("");

  const tags = ["One Piece", "Naruto", "Bleach", "Jujutsu", "Dragon Ball"];

  if (matchState) {
    return <Navigate to={`/game/${matchState.id}`} replace />;
  }

  const createRoom = () => {
    socket?.emit("room:create");
  };

  const joinRoom = () => {
    if (!roomIdInput.trim()) return;
    socket?.emit("room:join", { roomId: roomIdInput.trim() });
  };

  const pasteRoomId = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setRoomIdInput(text.trim());
    } catch (err) {
      console.error("Clipboard access denied");
    }
  };

  if (roomId && !matchState) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="bg-slate-800 rounded-xl p-8 border border-slate-700 text-center">
          <h2 className="text-2xl font-bold text-yellow-400 mb-4">
            Room Created
          </h2>

          <p className="text-slate-400 mb-3">Share this Room ID</p>

          <div className="bg-slate-700 rounded p-3 font-mono text-yellow-300 mb-4">
            {roomId}
          </div>

          <button
            onClick={() => navigator.clipboard.writeText(roomId)}
            className="px-4 py-2 bg-yellow-400 text-black rounded"
          >
            Copy Room ID
          </button>

          <p className="mt-4 text-slate-400">Waiting for opponent...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8">
      <div className="max-w-7xl mx-auto grid grid-cols-[1fr_340px] gap-8">
        {/* LEFT SIDE */}
        <div>
          {/* TITLE */}
          <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            Anime Draft Arena
          </h1>

          {/* EXPLORE CARDS */}
          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <h2 className="text-xl font-semibold mb-4">Explore Cards</h2>

            {/* TAG FILTERS */}
            <div className="flex flex-wrap gap-3 mb-6">
              {tags.map((tag) => (
                <button
                  key={tag}
                  className="px-3 py-1 text-sm bg-slate-700 border border-slate-600 rounded hover:border-yellow-400 transition"
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* CARD GRID (placeholder) */}
            <div className="grid grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="h-36 rounded bg-slate-700 border border-slate-600"
                />
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="bg-slate-800 rounded-xl border border-slate-700 p-6 flex flex-col gap-6">
          {/* USER PROFILE */}
          <div className="flex items-center gap-3 border-b border-slate-700 pb-4">
            <div className="w-10 h-10 rounded-full bg-slate-600" />
            <div>
              <p className="font-semibold">Player</p>
              <p className="text-xs text-slate-400">Online</p>
            </div>
          </div>

          {/* CREATE ROOM */}
          <button
            onClick={createRoom}
            className="w-full py-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-bold rounded-lg hover:shadow-lg hover:shadow-yellow-400/40"
          >
            Create Room
          </button>

          {/* JOIN ROOM */}
          <div className="flex flex-col gap-3">
            <input
              value={roomIdInput}
              onChange={(e) => setRoomIdInput(e.target.value)}
              placeholder="Enter room ID"
              className="px-4 py-2 bg-slate-700 border border-slate-600 rounded text-white"
            />

            <button
              onClick={joinRoom}
              disabled={!roomIdInput.trim()}
              className="py-3 bg-yellow-400 text-black rounded disabled:opacity-50"
            >
              Join Room
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
