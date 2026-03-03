import { useState } from "react";
import PlayerPanel from "./PlayerPanel";
import { useSocket } from "../hooks/useSocket";
import type { Role } from "../types/game";

export default function GameBoard() {
  const { socket, matchState, playerId } = useSocket();
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  if (!matchState || !playerId) {
    return (
      <div className="min-h-screen bg-neutral-900 text-white flex items-center justify-center">
        Waiting for opponent…
      </div>
    );
  }

  const myPlayer = matchState.players.find((p) => p.id === playerId);
  if (!myPlayer) return null;

  const pendingCard = myPlayer.pendingCard ?? null;

  const isMyTurn = matchState.currentTurnPlayerId === playerId;

  const canDraw = matchState.phase === "DRAFT" && isMyTurn && !pendingCard;

  const canAssign = !!pendingCard && !!selectedRole && isMyTurn;

  const canSkip =
    matchState.phase === "DRAFT" &&
    isMyTurn &&
    !!pendingCard &&
    !myPlayer.skipUsed;

 const handleSkip = () => {
   if (!socket) return;

   setSelectedRole(null);
   socket.emit("draft:skip");
 };


  const handleDraw = () => {
    if (!socket) return;
    setSelectedRole(null);
    socket.emit("draft:draw");
  };

  const handleAssign = () => {
    if (!socket || !selectedRole) return;

    socket.emit("draft:assign", {
      role: selectedRole,
    });


    setSelectedRole(null);
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white flex flex-col">
      {/* HEADER */}
      <header className="h-16 flex items-center justify-between px-6 border-b border-neutral-700">
        <div>Phase: {matchState.phase}</div>
        <div className={isMyTurn ? "text-emerald-400" : "text-neutral-500"}>
          {isMyTurn ? "Your Turn" : "Opponent Turn"}
        </div>
      </header>

      {/* MAIN */}
      <main className="flex-1 grid grid-cols-3 gap-6 p-6">
        <PlayerPanel
          title="You"
          variant="you"
          selectedRole={selectedRole}
          setSelectedRole={setSelectedRole}
          isMyTurn={isMyTurn}
        />

        {/* CENTER */}
        <section className="flex flex-col items-center gap-8">
          <div className="w-80 h-48 border-2 border-dashed border-neutral-600 flex items-center justify-center">
            {pendingCard ? (
              <div className="text-center">
                <p className="text-yellow-400 font-semibold">
                  {pendingCard.name}
                </p>
                <p className="text-sm text-neutral-400">{pendingCard.anime}</p>
              </div>
            ) : (
              "No Card Drawn"
            )}
          </div>

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
              {myPlayer.skipUsed ? "Skip Already Used" : "Skip"}
            </button>
          </div>

          <button
            disabled={!canDraw}
            onClick={handleDraw}
            className="px-6 py-3 rounded bg-indigo-600 disabled:opacity-50"
          >
            Draw Card
          </button>
        </section>

        <PlayerPanel title="Opponent" variant="opponent" />
      </main>

      {/* FOOTER */}
      <footer className="h-20 border-t border-neutral-700 flex items-center justify-center">
        {/* <button
          disabled={!canDraw}
          onClick={handleDraw}
          className="px-6 py-3 rounded bg-indigo-600 disabled:opacity-50"
        >
          Draw Card
        </button> */}
      </footer>
    </div>
  );
}
