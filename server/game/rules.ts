import type { Player, Card } from "./types.js";
import type { Role } from "./constants.js";

// Check if role is empty
export function isRoleAvailable(player: Player, role: Role): boolean {
  return !player.team[role];
}

// Check if player team is full
export function isTeamComplete(player: Player): boolean {
  return Object.keys(player.team).length === 5;
}

// Validate swap eligibility
export function canSwap(player: Player): boolean {
  return !player.skipUsed && !player.hasSwapped;
}

// Validate two roles can be swapped
export function canSwapRoles(
  player: Player,
  roleA: Role,
  roleB: Role,
): boolean {
  return (
    player.team[roleA] !== undefined &&
    player.team[roleB] !== undefined &&
    roleA !== roleB
  );
}
