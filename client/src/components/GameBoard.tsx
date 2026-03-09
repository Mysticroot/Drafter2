import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import PlayerPanel from "./PlayerPanel";
import CardTile from "./CardTile";
import { useSocket } from "../hooks/useSocket";
import { useTheme } from "../context/ThemeContext";
import type { Role } from "../types/game";

export default function GameBoard() {
  const { socket, matchState, playerId, resetMatch } = useSocket();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [swapMode, setSwapMode] = useState(false);
  const [swapRoles, setSwapRoles] = useState<Role[]>([]);

  if (!matchState || !playerId) {
    return (
      <div className="app-page relative min-h-screen text-white flex items-center justify-center overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-20 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-amber-500/20 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute right-0 top-20 h-72 w-72 rounded-full bg-rose-500/10 blur-3xl" />
        </div>
        <div className="relative z-10 text-lg font-semibold">
          Waiting for opponent...
        </div>
      </div>
    );
  }

  const myPlayer = matchState.players.find((p) => p.id === playerId);
  const opponent = matchState.players.find((p) => p.id !== playerId);

  if (!myPlayer || !opponent) return null;

  const pendingCard = myPlayer.pendingCard ?? null;
  const isMyTurn = matchState.currentTurnPlayerId === playerId;

  const isDraftPhase = matchState.phase === "DRAFT";
  const isSwapPhase = matchState.phase === "SWAP";
  const isFinishedPhase = matchState.phase === "FINISHED";

  const canDraw = isDraftPhase && isMyTurn && !pendingCard;
  const canAssign = isDraftPhase && !!pendingCard && !!selectedRole && isMyTurn;
  const canSkip =
    isDraftPhase && isMyTurn && !!pendingCard && !myPlayer.skipUsed;

  const canUseSwap = isSwapPhase && !myPlayer.skipUsed && !myPlayer.hasSwapped;

  const handleDraw = () => {
    if (!socket) return;
    setSelectedRole(null);
    socket.emit("draft:draw");
  };

  const handleAssign = () => {
    if (!socket || !selectedRole) return;
    socket.emit("draft:assign", { role: selectedRole });
    setSelectedRole(null);
  };

  const handleSkip = () => {
    if (!socket) return;
    socket.emit("draft:skip");
  };

  const handleConfirmSwap = () => {
    if (!socket || swapRoles.length !== 2) return;

    socket.emit("draft:swap", {
      roleA: swapRoles[0],
      roleB: swapRoles[1],
    });

    socket.emit("swap:finalize");

    setSwapMode(false);
    setSwapRoles([]);
  };

  const handleCancelSwap = () => {
    if (!socket) return;
    socket.emit("swap:finalize");
    setSwapMode(false);
    setSwapRoles([]);
  };

  const handlePlayAgain = () => {
    resetMatch();
    navigate("/lobby");
  };

  const myScore = myPlayer.totalScore ?? 0;
  const opponentScore = opponent.totalScore ?? 0;
  const didWin = matchState.winner === playerId;

  return (
    <div className="app-page relative min-h-screen text-white flex flex-col overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-amber-500/15 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />
        <div className="absolute right-0 top-16 h-80 w-80 rounded-full bg-rose-500/10 blur-3xl" />
      </div>

      {/* HEADER */}
      <header className="relative z-10 flex min-h-16 items-center justify-between gap-3 px-4 sm:px-6 border-b border-slate-700/80 bg-slate-900/40 backdrop-blur">
        <div className="text-sm sm:text-base">Phase: {matchState.phase}</div>
        <button
          type="button"
          onClick={toggleTheme}
          className="theme-toggle inline-flex h-9 w-9 items-center justify-center rounded-lg transition"
          aria-label="Toggle theme"
          title={
            theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
          }
        >
          {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </header>

      <main className="relative z-10 flex-1 grid grid-cols-1 gap-4 sm:gap-6 p-3 sm:p-5 lg:grid-cols-[minmax(14rem,1fr)_minmax(18rem,24rem)_minmax(14rem,1fr)]">
        {!isFinishedPhase && (
          <div className="lg:col-span-3 flex justify-center items-start h-fit">
            <div
              className={`w-fit rounded-full border px-3 py-[2px] text-large font-semibold ${
                isMyTurn
                  ? "border-emerald-300/70 bg-emerald-500/15 text-emerald-300"
                  : "border-slate-600 bg-slate-800/80 text-slate-300"
              }`}
            >
              {isMyTurn ? "Your Turn" : "Opponent Turn"}
            </div>
          </div>
        )}

        <div className="order-2 lg:order-1">
          <PlayerPanel
            title="You"
            variant="you"
            selectedRole={selectedRole}
            setSelectedRole={setSelectedRole}
            isMyTurn={isMyTurn}
            swapMode={swapMode}
            swapRoles={swapRoles}
            setSwapRoles={setSwapRoles}
          />
        </div>

        {/* CENTER PANEL */}
        <section className="order-1 lg:order-2 flex flex-col items-center justify-center gap-8">
          {/* ================= FINISHED SCREEN ================= */}
          {isFinishedPhase ? (
            <div className="flex flex-col items-center gap-6 w-full">
              <div className="text-3xl font-bold">
                {didWin ? "🎉 You Won!" : "💀 You Lost"}
              </div>

              <div className="mt-4 grid w-full max-w-lg grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
                <div className="bg-neutral-800 px-6 py-5 rounded-lg text-center">
                  <p className="text-sm text-neutral-400">Your Score</p>
                  <p className="text-2xl font-semibold text-emerald-400">
                    {myScore}
                  </p>
                </div>

                <div className="bg-neutral-800 px-6 py-5 rounded-lg text-center">
                  <p className="text-sm text-neutral-400">Opponent Score</p>
                  <p className="text-2xl font-semibold text-red-400">
                    {opponentScore}
                  </p>
                </div>
              </div>

              <button
                onClick={handlePlayAgain}
                className="mt-6 px-8 py-3 rounded bg-indigo-600 hover:bg-indigo-500"
              >
                Play Again
              </button>
            </div>
          ) : (
            <>
              {/* Pending Card */}
              <div className="w-full max-w-sm min-h-48 border-2 border-dashed border-slate-600 bg-slate-900/35 rounded-xl p-3 flex items-center justify-center">
                {pendingCard ? (
                  <div className="w-full">
                    <CardTile card={pendingCard} />
                  </div>
                ) : (
                  "No Card Drawn"
                )}
              </div>

              {/* DRAFT BUTTONS */}
              {isDraftPhase && (
                <div className="grid w-full max-w-md grid-cols-1 gap-3">
                  <button
                    disabled={!canAssign}
                    onClick={handleAssign}
                    className="px-6 py-3 rounded bg-emerald-600 disabled:opacity-50"
                  >
                    Assign Card
                  </button>

                  <button
                    disabled={!canSkip}
                    onClick={handleSkip}
                    className="px-6 py-3 rounded bg-red-600 disabled:opacity-50"
                  >
                    {myPlayer.skipUsed ? "Skip Used" : "Skip"}
                  </button>

                  <button
                    disabled={!canDraw}
                    onClick={handleDraw}
                    className="px-6 py-3 rounded bg-indigo-600 disabled:opacity-50"
                  >
                    Draw Card
                  </button>
                </div>
              )}

              {/* SWAP BUTTONS */}
              {canUseSwap && (
                <div className="grid w-full max-w-md grid-cols-1 gap-3">
                  {!swapMode && (
                    <>
                      <button
                        onClick={() => {
                          setSwapMode(true);
                          setSwapRoles([]);
                        }}
                        className="px-6 py-3 rounded bg-red-600"
                      >
                        Swap
                      </button>

                      <button
                        onClick={handleCancelSwap}
                        className="px-6 py-3 rounded bg-indigo-600"
                      >
                        Cancel Swap
                      </button>
                    </>
                  )}

                  {swapMode && (
                    <button
                      disabled={swapRoles.length !== 2}
                      onClick={handleConfirmSwap}
                      className="px-6 py-3 rounded bg-yellow-600 disabled:opacity-50"
                    >
                      Confirm Swap
                    </button>
                  )}
                </div>
              )}
            </>
          )}
        </section>

        <div className="order-3 lg:order-3">
          <PlayerPanel title="Opponent" variant="opponent" />
        </div>
      </main>
    </div>
  );
}
