import GameBoard from "../components/GameBoard";
import { useSocket } from "../hooks/useSocket";

export default function GamePage() {
  const { matchState } = useSocket();

  if (!matchState) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Waiting for match…
      </div>
    );
  }

  return <GameBoard />;
}
