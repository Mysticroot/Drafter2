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

  const tags = [...new Set(baseCharacters.map((card) => card.anime))];
  const trimmedRoomId = roomIdInput.trim();

  /* ---------------- NAVIGATE TO GAME ---------------- */

  if (matchState && matchState.phase !== "FINISHED") {
    return <Navigate to={`/game/${matchState.id}`} replace />;
  }

  /* ---------------- WAITING ROOM SCREEN ---------------- */

  if (roomId && !matchState) {
    return (
      <div className="relative min-h-screen flex flex-col overflow-hidden bg-slate-950 text-slate-100">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-amber-500/20 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute right-0 top-16 h-72 w-72 rounded-full bg-rose-500/10 blur-3xl" />
        </div>

        <Navbar />

        <main className="relative z-10 flex flex-1 items-center justify-center px-6 py-10">
          <section className="w-full max-w-xl rounded-3xl border border-slate-700/80 bg-slate-900/80 p-8 text-center shadow-2xl backdrop-blur">
            <p className="mx-auto mb-3 inline-flex rounded-full border border-amber-400/40 bg-amber-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-200">
              Lobby Ready
            </p>

            <h2 className="text-3xl font-extrabold tracking-tight text-white">
              Room Created
            </h2>

            <p className="mt-3 text-slate-300">
              Share this room code with your opponent. Match begins instantly
              when they join.
            </p>

            <div className="mt-6 rounded-2xl border border-slate-600 bg-slate-950/80 px-4 py-5 font-mono text-lg font-bold tracking-[0.14em] text-amber-300 break-all">
              {roomId}
            </div>

            <button
              onClick={() => navigator.clipboard.writeText(roomId)}
              className="mt-4 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-amber-400 to-orange-400 px-5 py-2.5 font-bold text-slate-950 transition hover:brightness-110"
            >
              Copy Room Code
            </button>

            <p className="mt-6 text-sm text-slate-400">
              Waiting for opponent to join...
            </p>
          </section>
        </main>

        <Footer />
      </div>
    );
  }

  /* ---------------- ACTIONS ---------------- */

  const createRoom = () => {
    socket?.emit("room:create");
  };

  const joinRoom = () => {
    if (!trimmedRoomId) return;
    socket?.emit("room:join", { roomId: trimmedRoomId });
  };

  /* ---------------- CARD FILTER ---------------- */

  const filteredCards = selectedTag
    ? baseCharacters.filter((c) => c.anime === selectedTag)
    : baseCharacters;

  /* ---------------- MAIN LOBBY ---------------- */

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-amber-500/15 blur-3xl" />
        <div className="absolute bottom-0 left-[-4rem] h-80 w-80 rounded-full bg-sky-500/10 blur-3xl" />
        <div className="absolute right-[-4rem] top-28 h-80 w-80 rounded-full bg-rose-500/10 blur-3xl" />
      </div>

      <Navbar />

      <main className="relative z-10 flex-1 px-4 pb-10 pt-8 md:px-8">
        <div className="mx-auto max-w-7xl">
          <section className="mb-7 flex flex-col gap-3 rounded-2xl border border-slate-700/80 bg-slate-900/70 px-5 py-5 shadow-xl backdrop-blur md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300/90">
                Battle Lobby
              </p>
              <h2 className="mt-1 text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                Build Your Dream Team
              </h2>
              <p className="mt-2 max-w-2xl text-sm text-slate-300 md:text-base">
                Scout anime legends, enter the draft arena, and outscore your
                rival through smart role picks and late-game swaps.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-center sm:w-[300px]">
              <div className="rounded-xl border border-slate-700 bg-slate-950/80 px-3 py-3">
                <p className="text-xs uppercase tracking-wide text-slate-400">
                  Total Cards
                </p>
                <p className="mt-1 text-xl font-bold text-white">
                  {baseCharacters.length}
                </p>
              </div>
              <div className="rounded-xl border border-slate-700 bg-slate-950/80 px-3 py-3">
                <p className="text-xs uppercase tracking-wide text-slate-400">
                  Franchises
                </p>
                <p className="mt-1 text-xl font-bold text-white">
                  {tags.length}
                </p>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_360px]">
            {/* LEFT SIDE */}
            <section className="rounded-2xl border border-slate-700/80 bg-slate-900/70 p-5 shadow-xl backdrop-blur">
              <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-xl font-bold text-white">Character Pool</h3>
                <p className="text-sm text-slate-400">
                  Showing {filteredCards.length} cards
                </p>
              </div>

              {/* TAG FILTERS */}
              <div className="mb-6 flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedTag(null)}
                  className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
                    selectedTag === null
                      ? "border-amber-300 bg-amber-500/20 text-amber-200"
                      : "border-slate-600 bg-slate-800 text-slate-300 hover:border-amber-300"
                  }`}
                >
                  All
                </button>

                {tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`rounded-full border px-4 py-1.5 text-sm font-medium transition ${
                      selectedTag === tag
                        ? "border-amber-300 bg-amber-500/20 text-amber-200"
                        : "border-slate-600 bg-slate-800 text-slate-300 hover:border-amber-300"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>

              {/* CARD GRID */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
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
            </section>

            {/* RIGHT PANEL */}
            <aside className="h-fit rounded-2xl border border-slate-700/80 bg-slate-900/80 p-6 shadow-xl backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300/90">
                Matchmaking
              </p>

              <h3 className="mt-1 text-2xl font-extrabold text-white">
                Enter The Arena
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                Create a private room for your duel, or join a friend instantly
                with a room code.
              </p>

              <button
                onClick={createRoom}
                className="mt-6 w-full rounded-xl bg-gradient-to-r from-amber-400 to-orange-400 py-3 font-bold text-slate-950 transition hover:translate-y-[-1px] hover:brightness-110"
              >
                Create Private Room
              </button>

              <div className="my-5 flex items-center gap-3">
                <div className="h-px flex-1 bg-slate-700" />
                <span className="text-xs uppercase tracking-widest text-slate-500">
                  or
                </span>
                <div className="h-px flex-1 bg-slate-700" />
              </div>

              <div className="flex flex-col gap-3">
                <label
                  htmlFor="roomCode"
                  className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400"
                >
                  Room Code
                </label>

                <input
                  id="roomCode"
                  value={roomIdInput}
                  onChange={(e) => setRoomIdInput(e.target.value)}
                  placeholder="Enter Room ID"
                  className="rounded-xl border border-slate-600 bg-slate-800/90 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-amber-300"
                />

                <button
                  onClick={joinRoom}
                  disabled={!trimmedRoomId}
                  className="rounded-xl border border-amber-300/70 bg-amber-400/90 py-3 font-semibold text-slate-950 transition hover:brightness-110 disabled:cursor-not-allowed disabled:border-slate-600 disabled:bg-slate-700 disabled:text-slate-400"
                >
                  Join Room
                </button>
              </div>

              <div className="mt-5 rounded-xl border border-slate-700 bg-slate-950/70 p-3 text-xs text-slate-400">
                Tip: Keep this tab open during a match. Reconnect works per-tab
                identity.
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
