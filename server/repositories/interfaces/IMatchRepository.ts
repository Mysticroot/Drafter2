import type { Match } from "../../game/match.js";

export interface IMatchRepository {
  save(match: Match): void;
  getById(matchId: string): Match | undefined;
  delete(matchId: string): void;
  list(): Match[];
}
