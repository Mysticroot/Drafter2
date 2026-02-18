import type { Role, MatchPhase } from "./constants.js";

export interface CardStats {
  CAPTAIN: number;
  VICE_CAPTAIN: number;
  TANK: number;
  HEALER: number;
  SUPPORT: number;
}

export interface Card {
  id: string;
  name: string;
  anime: string;
  stats: CardStats;
}

export interface Player {
  id: string;
  socketId: string;
  skipUsed: boolean;
  team: Partial<Record<Role, Card>>;
  hasSwapped: boolean;
}

// export interface MatchState {
//   id: string;
//   phase: MatchPhase;
//   deck: Card[];
//   players: Player[];
//   currentTurnPlayerId: string | null;
//   winner: string | null;
// }

export interface MatchState {
  id: string;
  phase: MatchPhase;
  deck: Card[];
  players: Player[];
  currentTurnPlayerId: string | null;
  winner: string | null;

  // NEW
  pendingCard: Card | null;
}

