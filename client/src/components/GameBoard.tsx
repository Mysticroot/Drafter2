import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PlayerPanel from "./PlayerPanel";
import { useSocket } from "../hooks/useSocket";
import type { Role } from "../types/game";

export default function GameBoard() {
  const { socket, matchState, playerId ,resetMatch} = useSocket();
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [swapMode, setSwapMode] = useState(false);
  const [swapRoles, setSwapRoles] = useState<Role[]>([]);

  if (!matchState || !playerId) {
    return (
      <div className="min-h-screen bg-neutral-900 text-white flex items-center justify-center">
        Waiting for opponent…
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
   navigate("/");
 };
 

  const myScore = myPlayer.totalScore ?? 0;
  const opponentScore = opponent.totalScore ?? 0;
  const didWin = matchState.winner === playerId;

  return (
    <div className="min-h-screen bg-neutral-900 text-white flex flex-col">
      {/* HEADER */}
      <header className="h-16 flex items-center justify-between px-6 border-b border-neutral-700">
        <div>Phase: {matchState.phase}</div>
        {!isFinishedPhase && (
          <div className={isMyTurn ? "text-emerald-400" : "text-neutral-500"}>
            {isMyTurn ? "Your Turn" : "Opponent Turn"}
          </div>
        )}
      </header>

      <main className="flex-1 grid grid-cols-3 gap-6 p-6">
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

        {/* CENTER PANEL */}
        <section className="flex flex-col items-center justify-center gap-8">
          {/* ================= FINISHED SCREEN ================= */}
          {isFinishedPhase ? (
            <div className="flex flex-col items-center gap-6">
              <div className="text-3xl font-bold">
                {didWin ? "🎉 You Won!" : "💀 You Lost"}
              </div>

              <div className="flex gap-12 mt-4">
                <div className="bg-neutral-800 px-8 py-6 rounded-lg text-center">
                  <p className="text-sm text-neutral-400">Your Score</p>
                  <p className="text-2xl font-semibold text-emerald-400">
                    {myScore}
                  </p>
                </div>

                <div className="bg-neutral-800 px-8 py-6 rounded-lg text-center">
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
              <div className="w-80 h-48 border-2 border-dashed border-neutral-600 flex items-center justify-center">
                {pendingCard ? (
                  <div className="text-center">
                    <p className="text-yellow-400 font-semibold">
                      {pendingCard.name}
                    </p>
                    <p className="text-sm text-neutral-400">
                      {pendingCard.anime}
                    </p>
                  </div>
                ) : (
                  "No Card Drawn"
                )}
              </div>

              {/* DRAFT BUTTONS */}
              {isDraftPhase && (
                <div className="flex gap-4">
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
                <div className="flex gap-4">
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

        <PlayerPanel title="Opponent" variant="opponent" />
      </main>
    </div>
  );
}
