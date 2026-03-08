import { Match } from "../game/match.js";

class MatchService {
  private matches: Map<string, Match>;

  constructor() {
    this.matches = new Map();
  }

  // -------------------
  // Create new match
  // -------------------
  createMatch(selectedAnimes: string[] = []): Match {
    const match = new Match(selectedAnimes);
    this.matches.set(match.getState().id, match);
    return match;
  }

  // -------------------
  // Get match by ID
  // -------------------
  getMatch(matchId: string): Match | undefined {
    return this.matches.get(matchId);
  }

  // -------------------
  // Remove match
  // -------------------
  removeMatch(matchId: string) {
    this.matches.delete(matchId);
  }

  // -------------------
  // Get all matches (debugging)
  // -------------------
  getAllMatches(): Match[] {
    return Array.from(this.matches.values());
  }
}

// Export singleton instance
export const matchService = new MatchService();
