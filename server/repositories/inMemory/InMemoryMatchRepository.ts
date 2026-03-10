import type { Match } from "../../game/match.js";
import type { IMatchRepository } from "../interfaces/IMatchRepository.js";

export class InMemoryMatchRepository implements IMatchRepository {
  private readonly matches = new Map<string, Match>();

  save(match: Match): void {
    this.matches.set(match.getState().id, match);
  }

  getById(matchId: string): Match | undefined {
    return this.matches.get(matchId);
  }

  delete(matchId: string): void {
    this.matches.delete(matchId);
  }

  list(): Match[] {
    return Array.from(this.matches.values());
  }
}
