import GameBoard from "../components/GameBoard";
import { useSocket } from "../hooks/useSocket";

export default function GamePage() {
  const { matchState } = useSocket();

  if (!matchState) {
    return (
      <div className="app-page relative min-h-screen text-white flex items-center justify-center overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-20 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-amber-500/20 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute right-0 top-20 h-72 w-72 rounded-full bg-rose-500/10 blur-3xl" />
        </div>
        <div className="relative z-10 text-lg font-semibold">
          Waiting for match...
        </div>
      </div>
    );
  }

  return <GameBoard />;
}
