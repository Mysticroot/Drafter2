export type Role = "CAPTAIN" | "VICE_CAPTAIN" | "TANK" | "HEALER" | "SUPPORT";

export type MatchPhase = "LOBBY" | "DRAFT" | "SWAP" | "SCORING" | "FINISHED";

export interface Card {
  id: string;
  name: string;
  anime: string;
  image: string; // ✅ ADD THIS
  stats: Record<Role, number>;
}


export interface Player {
  id: string;
  socketId: string;
  skipUsed: boolean;
  hasSwapped: boolean;
  team: Partial<Record<Role, Card>>;
  pendingCard: Card | null; // ✅ ADD THIS
  totalScore?: number;
}

export interface MatchState {
  id: string;
  phase: MatchPhase;
  deck: Card[];
  players: Player[];
  currentTurnPlayerId: string | null;
  winner: string | null;
}
