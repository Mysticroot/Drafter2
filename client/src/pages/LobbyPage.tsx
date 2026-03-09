import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useSocket } from "../hooks/useSocket";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CardTile from "../components/CardTile";

import { baseCharacters } from "../assets/char";

const FRANCHISE_TAGS = [...new Set(baseCharacters.map((card) => card.anime))];
const MIN_DECK_SIZE = 10;
const FEATURED_CHARACTER_NAMES = new Set([
  "Monkey D. Luffy",
  "Roronoa Zoro",
  "Naruto Uzumaki",
  "Sasuke Uchiha",
  "Madara Uchiha",
  "Goku",
  "Vegeta",
  "Gon Freecss",
  "Killua Zoldyck",
  "Asta",
  "Yuno",
  "Whitebeard",
]);

export default function LobbyPage() {
  const { socket, roomId, matchState } = useSocket();

  const [roomIdInput, setRoomIdInput] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const tags = FRANCHISE_TAGS;
  const [selectedPoolTags, setSelectedPoolTags] = useState<string[]>(tags);
  const trimmedRoomId = roomIdInput.trim();

  /* ---------------- NAVIGATE TO GAME ---------------- */

  if (matchState && matchState.phase !== "FINISHED") {
    return <Navigate to={`/game/${matchState.id}`} replace />;
  }

  /* ---------------- WAITING ROOM SCREEN ---------------- */

  if (roomId && !matchState) {
    return (
      <div className="app-page relative min-h-screen flex flex-col overflow-hidden text-slate-100">
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
              className="btn-primary mt-4 inline-flex items-center justify-center rounded-xl px-5 py-2.5 transition"
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
    socket?.emit("room:create", { animes: selectedPoolTags });
  };

  const togglePoolTag = (tag: string) => {
    setSelectedPoolTags((prev) => {
      if (prev.includes(tag)) {
        if (prev.length === 1) return prev;
        return prev.filter((value) => value !== tag);
      }

      return [...prev, tag];
    });
  };

  const joinRoom = () => {
    if (!trimmedRoomId) return;
    socket?.emit("room:join", { roomId: trimmedRoomId });
  };

  /* ---------------- CARD FILTER ---------------- */

  const featuredCards = baseCharacters.filter((card) =>
    FEATURED_CHARACTER_NAMES.has(card.name),
  );

  const filteredCards = selectedTag
    ? featuredCards.filter((c) => c.anime === selectedTag)
    : featuredCards;

  const selectedPoolSize = baseCharacters.filter((card) =>
    selectedPoolTags.includes(card.anime),
  ).length;

  const canCreateRoom = selectedPoolSize >= MIN_DECK_SIZE;

  /* ---------------- MAIN LOBBY ---------------- */

  return (
    <div className="app-page relative min-h-screen flex flex-col overflow-hidden text-slate-100">
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
            <section className="order-2 xl:order-1 rounded-2xl border border-slate-700/80 bg-slate-900/70 p-5 shadow-xl backdrop-blur">
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

              <div className="mb-5">
                <Link
                  to="/cards"
                  className="inline-flex rounded-md border border-amber-300/60 bg-amber-500/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-amber-200 transition hover:bg-amber-500/20"
                >
                  View All Cards
                </Link>
              </div>

              {/* CARD GRID */}
              <div className="max-h-[52rem] overflow-y-auto pr-1 md:max-h-none md:overflow-visible">
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
              </div>
            </section>

            {/* RIGHT PANEL */}
            <aside className="order-1 xl:order-2 h-fit rounded-2xl border border-slate-700/80 bg-slate-900/80 p-6 shadow-xl backdrop-blur">
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
                disabled={!canCreateRoom}
                className="btn-primary mt-6 w-full rounded-xl py-3 transition hover:translate-y-[-1px] disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                Create Private Room
              </button>

              <div className="mt-5 rounded-xl border border-slate-700 bg-slate-950/70 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                    Draft Pool Categories
                  </p>
                  <button
                    onClick={() => setSelectedPoolTags(tags)}
                    className="rounded-md border border-slate-600 px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-300 transition hover:border-amber-300 hover:text-amber-200"
                  >
                    Select All
                  </button>
                </div>

                <p className="mt-2 text-xs text-slate-400">
                  Selected {selectedPoolTags.length}/{tags.length} franchises (
                  {selectedPoolSize} cards)
                </p>

                {!canCreateRoom && (
                  <p className="mt-2 text-xs text-rose-300">
                    Select more franchises. You need at least {MIN_DECK_SIZE}{" "}
                    cards in the draft pool.
                  </p>
                )}

                <div className="mt-3 flex flex-wrap gap-2">
                  {tags.map((tag) => {
                    const isSelected = selectedPoolTags.includes(tag);

                    return (
                      <button
                        key={`pool-${tag}`}
                        onClick={() => togglePoolTag(tag)}
                        className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                          isSelected
                            ? "border-amber-300 bg-amber-500/20 text-amber-200"
                            : "border-slate-600 bg-slate-800 text-slate-300 hover:border-amber-300"
                        }`}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </div>

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
                  className="btn-primary rounded-xl py-3 transition disabled:cursor-not-allowed"
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
