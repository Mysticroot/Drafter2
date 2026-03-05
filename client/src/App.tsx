import { Routes, Route, Navigate } from "react-router-dom";

import LobbyPage from "./pages/LobbyPage";
import GamePage from "./pages/GamePage";

export default function App() {
  return (
    <Routes>
      {/* Lobby */}
      <Route path="/" element={<LobbyPage />} />

      {/* Game */}
      <Route path="/game/:roomId" element={<GamePage />} />

      {/* Safety fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
