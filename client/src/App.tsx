import { Routes, Route, Navigate } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import LobbyPage from "./pages/LobbyPage";
import GamePage from "./pages/GamePage";
import CardsPage from "./pages/CardsPage";

export default function App() {
  return (
    <Routes>
      {/* Landing */}
      <Route path="/" element={<LandingPage />} />

      {/* Lobby */}
      <Route path="/lobby" element={<LobbyPage />} />

      {/* Cards */}
      <Route path="/cards" element={<CardsPage />} />

      {/* Game */}
      <Route path="/game/:roomId" element={<GamePage />} />

      {/* Safety fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
