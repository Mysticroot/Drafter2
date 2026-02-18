import PlayerPanel from "./PlayerPanel";

export default function GameBoard() {
  return (
    <div className="min-h-screen bg-neutral-900 text-white flex flex-col">
      {/* ---------- Header ---------- */}
      <header className="h-16 flex items-center justify-between px-6 border-b border-neutral-700">
        <div className="text-sm text-neutral-400">Phase: DRAFT</div>

        <div className="text-sm font-medium text-emerald-400">Your Turn</div>
      </header>

      {/* ---------- Main Board ---------- */}
      <main className="flex-1 grid grid-cols-3 gap-6 p-6">
        {/* ----- LEFT: YOU ----- */}
        {/* ----- LEFT: YOU ----- */}
        <section className="flex flex-col gap-4">
          <PlayerPanel title="You" variant="you" />

          {/* Assign Button (UI only for now) */}
          <button className="mt-2 px-4 py-2 rounded bg-emerald-600 hover:bg-emerald-700 transition text-sm font-medium">
            Assign Card
          </button>
        </section>

        {/* ----- CENTER: ROLES + POOL ----- */}
        <section className="flex flex-col items-center gap-12 mt-12">
          {/* Roles (always visible) */}
          <div className="flex flex-col gap-3 w-40">
            {["Captain", "Vice Captain", "Tank", "Healer", "Support"].map(
              (role) => (
                <div
                  key={role}
                  className="h-10 rounded border border-neutral-700 bg-neutral-800 flex items-center justify-center text-sm text-neutral-400"
                >
                  {role}
                </div>
              ),
            )}
          </div>

          {/* Pool / Pending Card */}
          <div className="w-full max-w-md h-44 rounded border-2 border-dashed border-neutral-600 flex items-center justify-center text-neutral-400">
            Pool / Pending Card
          </div>
        </section>

        {/* ----- RIGHT: OPPONENT ----- */}
        <PlayerPanel title="Opponent" variant="opponent" />
      </main>

      {/* ---------- Action Bar ---------- */}
      <footer className="h-20 border-t border-neutral-700 flex items-center justify-center gap-4">
        <button className="px-6 py-3 rounded bg-indigo-600 hover:bg-indigo-700 transition">
          Draw Card
        </button>

        <button className="px-6 py-3 rounded bg-neutral-700 hover:bg-neutral-600 transition">
          Skip / Swap
        </button>
      </footer>
    </div>
  );
}
