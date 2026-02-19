import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useSocket } from "../hooks/useSocket";

export default function LobbyPage() {
const { socket, roomId, matchState } = useSocket();
  const [roomIdInput, setRoomIdInput] = useState("");

  // 🚀 Auto-navigate ONLY when match starts
  if (matchState) {
    return <Navigate to={`/game/${matchState.id}`} replace />;
  }

  // --------------------
  // Actions (intent only)
  // --------------------
  const createRoom = () => {
    socket?.emit("room:create");
  };

  const joinRoom = () => {
    if (!roomIdInput.trim()) return;
    socket?.emit("room:join", { roomId: roomIdInput.trim() });
  };

  // --------------------
  // Waiting room UI (after create)
  // --------------------
if (roomId && !matchState) {


    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
        <div className="bg-slate-800 rounded-xl shadow-2xl max-w-md w-full p-8 border border-slate-700">
          <h1 className="text-3xl font-bold text-center mb-4 text-yellow-400">
            Room Created 🎉
          </h1>

          <p className="text-slate-400 text-center mb-6">
            Share this Room ID with your opponent
          </p>

          {/* Room ID Card */}
          <div className="bg-slate-700 rounded-lg p-4 mb-6 border border-yellow-400">
            <p className="text-sm text-slate-400 mb-2">Room ID</p>
            <p className="text-xl font-mono text-yellow-300 break-all text-center">
              {roomId}
            </p>

            <button
              onClick={() => {
                navigator.clipboard.writeText(roomId);
              }}
              className="w-full mt-3 py-2 text-sm rounded bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-400 text-yellow-300 transition"
            >
              Copy Room ID
            </button>
          </div>

          <p className="text-center text-slate-400">
            Waiting for opponent to join…
          </p>
        </div>
      </div>
    );
  }

  // --------------------
  // Default Lobby UI
  // --------------------
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="bg-slate-800 rounded-xl shadow-2xl max-w-md w-full p-8 border border-slate-700">
        <h1 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-yellow-400 via-orange-400 to-purple-500 bg-clip-text text-transparent">
          Anime Draft Arena
        </h1>

        <p className="text-slate-400 text-center mb-8">
          Strategic anime character drafting battle
        </p>

        {/* Create Room */}
        <div className="mb-6">
          <button
            onClick={createRoom}
            className="w-full py-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-slate-900 font-bold rounded-lg hover:shadow-lg hover:shadow-yellow-400/50 transition-all"
          >
            Create Room
          </button>
        </div>

        {/* Join Room */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Room ID
            </label>
            <input
              type="text"
              value={roomIdInput}
              onChange={(e) => setRoomIdInput(e.target.value)}
              placeholder="Enter room ID"
              className="w-full px-4 py-2 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-yellow-400"
            />
          </div>

          <button
            onClick={joinRoom}
            disabled={!roomIdInput.trim()}
            className="w-full py-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-slate-900 font-bold rounded-lg hover:shadow-lg hover:shadow-yellow-400/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Join Room
          </button>
        </div>
      </div>
    </div>
  );
}
