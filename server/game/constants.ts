export const ROLES = [
  "CAPTAIN",
  "VICE_CAPTAIN",
  "TANK",
  "HEALER",
  "SUPPORT",
] as const;

export type Role = (typeof ROLES)[number];

export const MATCH_PHASES = [
  "LOBBY",
  "DRAFT",
  "SWAP",
  "SCORING",
  "FINISHED",
] as const;

export type MatchPhase = (typeof MATCH_PHASES)[number];
