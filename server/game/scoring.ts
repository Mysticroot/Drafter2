import type { Player } from "./types.js";
import type { Role } from "./constants.js";

export function calculatePlayerScore(player: Player): number {
  let total = 0;

  for (const role in player.team) {
    const typedRole = role as Role;
    const card = player.team[typedRole];

    if (!card) continue;

    total += card.stats[typedRole];
  }

  return total;
}

export function determineWinner(players: Player[]): {
  winnerId: string | null;
  scores: Record<string, number>;
} {
  const scores: Record<string, number> = {};

  players.forEach((player) => {
    scores[player.id] = calculatePlayerScore(player);
  });

  const [p1, p2] = players;

  if (!p1 || !p2) {
    return { winnerId: null, scores };
  }

  if (scores[p1.id] > scores[p2.id]) {
    return { winnerId: p1.id, scores };
  }

  if (scores[p2.id] > scores[p1.id]) {
    return { winnerId: p2.id, scores };
  }

  return { winnerId: null, scores }; // draw
}
