import { useState } from "react";
import {  Navigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CardTile from "../components/CardTile";
import { baseCharacters } from "../assets/char";
import { useSocket } from "../hooks/useSocket";

const FRANCHISE_TAGS = [...new Set(baseCharacters.map((card) => card.anime))];

export default function CardsPage() {
  const { matchState } = useSocket();
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  if (matchState && matchState.phase !== "FINISHED") {
    return <Navigate to={`/game/${matchState.id}`} replace />;
  }

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredCards = baseCharacters.filter((card) => {
    const matchesTag = selectedTag ? card.anime === selectedTag : true;
    const matchesName = normalizedQuery
      ? card.name.toLowerCase().includes(normalizedQuery)
      : true;

    return matchesTag && matchesName;
  });

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
          

          <section className="rounded-2xl border border-slate-700/80 bg-slate-900/70 p-5 shadow-xl backdrop-blur">
            <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="mt-1 text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                All Draft Cards
              </h2>
              <p className="text-sm text-slate-400 ">
                Showing {filteredCards.length} cards
              </p>
            </div>

            <div className="mb-4 grid grid-cols-2 gap-3 text-center sm:max-w-sm">
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
                  {FRANCHISE_TAGS.length}
                </p>
              </div>
            </div>

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

              {FRANCHISE_TAGS.map((tag) => (
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

            <div className="mb-6">
              <label
                htmlFor="cardSearch"
                className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-slate-400"
              >
                Search By Name
              </label>
              <input
                id="cardSearch"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Type a character name..."
                className="w-full rounded-xl border border-slate-600 bg-slate-800/90 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-amber-300"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
              {filteredCards.map((card) => (
                <CardTile
                  key={`${card.anime}-${card.name}`}
                  card={{
                    ...card,
                    id: `${card.anime}-${card.name}`,
                  }}
                />
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
