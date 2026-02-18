export type Role = "CAPTAIN" | "VICE_CAPTAIN" | "TANK" | "HEALER" | "SUPPORT";

export type MatchPhase = "LOBBY" | "DRAFT" | "SWAP" | "SCORING" | "FINISHED";

export interface Card {
  id: string;
  name: string;
  anime: string;
  stats: Record<Role, number>;
}

export interface Player {
  id: string;
  socketId: string;
  skipUsed: boolean;
  hasSwapped: boolean;
  team: Partial<Record<Role, Card>>;
}

export interface MatchState {
  id: string;
  phase: MatchPhase;
  players: Player[];
  currentTurnPlayerId: string | null;
  pendingCard: Card | null;
  winner: string | null;
}
