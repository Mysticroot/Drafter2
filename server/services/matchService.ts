import { Match } from "../game/match.js";
import { repositories } from "../repositories/index.js";

class MatchService {
  // -------------------
  // Create new match
  // -------------------
  createMatch(selectedAnimes: string[] = []): Match {
    const match = new Match(selectedAnimes);
    repositories.match.save(match);
    return match;
  }

  // -------------------
  // Get match by ID
  // -------------------
  getMatch(matchId: string): Match | undefined {
    return repositories.match.getById(matchId);
  }

  // -------------------
  // Remove match
  // -------------------
  removeMatch(matchId: string) {
    repositories.match.delete(matchId);
  }

  // -------------------
  // Get all matches (debugging)
  // -------------------
  getAllMatches(): Match[] {
    return repositories.match.list();
  }
}

// Export singleton instance
export const matchService = new MatchService();
