import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useSocket } from "../hooks/useSocket";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CardTile from "../components/CardTile";

import { baseCharacters } from "../assets/char";

export default function LobbyPage() {
  const { socket, roomId, matchState } = useSocket();

  const [roomIdInput, setRoomIdInput] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const tags = ["One Piece", "Naruto", "Bleach"];


  /* ---------------- NAVIGATE TO GAME ---------------- */

  if (matchState) {
    return <Navigate to={`/game/${matchState.id}`} replace />;
  }

  /* ---------------- WAITING ROOM SCREEN ---------------- */

  if (roomId && !matchState) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-900 text-white">
        <Navbar />

        <div className="flex-1 flex items-center justify-center">
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-8 text-center w-[420px]">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4">
              Room Created 🎉
            </h2>

            <p className="text-slate-400 mb-6">
              Share this Room ID with your opponent
            </p>

            <div className="bg-slate-700 p-4 rounded-lg font-mono text-yellow-300 mb-4 break-all">
              {roomId}
            </div>

            <button
              onClick={() => navigator.clipboard.writeText(roomId)}
              className="px-4 py-2 bg-yellow-400 text-black rounded hover:bg-yellow-300"
            >
              Copy Room ID
            </button>

            <p className="mt-6 text-slate-400">
              Waiting for opponent to join...
            </p>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  /* ---------------- ACTIONS ---------------- */

  const createRoom = () => {
    socket?.emit("room:create");
  };

  const joinRoom = () => {
    if (!roomIdInput.trim()) return;
    socket?.emit("room:join", { roomId: roomIdInput.trim() });
  };

  /* ---------------- CARD FILTER ---------------- */

  const filteredCards = selectedTag
    ? baseCharacters.filter((c) => c.anime === selectedTag)
    : baseCharacters;

  /* ---------------- MAIN LOBBY ---------------- */

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <Navbar />

      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto grid grid-cols-[1fr_340px] gap-8 items-start">
          {/* LEFT SIDE */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Explore Cards</h2>

            {/* TAG FILTERS */}
            <div className="flex flex-wrap gap-3 mb-6">
              <button
                onClick={() => setSelectedTag(null)}
                className="px-3 py-1 text-sm bg-slate-700 border border-slate-600 rounded hover:border-yellow-400"
              >
                All
              </button>

              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className="px-3 py-1 text-sm bg-slate-700 border border-slate-600 rounded hover:border-yellow-400"
                >
                  {tag}
                </button>
              ))}
            </div>

            {/* CARD GRID */}
            <div className="grid grid-cols-4 gap-4">
              {filteredCards.map((card, i) => (
                <CardTile
                  key={i}
                  card={{
                    ...card,
                    id: "preview",
                  }}
                />
              ))}
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-6 flex flex-col gap-6 h-fit">
            <h3 className="text-lg font-semibold">Play Match</h3>

            <button
              onClick={createRoom}
              className="w-full py-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-bold rounded-lg hover:shadow-lg hover:shadow-yellow-400/40"
            >
              Create Room
            </button>

            <div className="flex flex-col gap-3">
              <input
                value={roomIdInput}
                onChange={(e) => setRoomIdInput(e.target.value)}
                placeholder="Enter Room ID"
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
      </main>

      <Footer />
    </div>
  );
}
