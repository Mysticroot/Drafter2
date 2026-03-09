import { v4 as uuid } from "uuid";
import { createDeck, drawCard } from "./deck.js";
import type { MatchState, Player, Card } from "./types.js";
import type { Role } from "./constants.js";
import { canSwap, canSwapRoles, isTeamComplete } from "./rules.js";
import { determineWinner } from "./scoring.js";

export class Match {
  private state: MatchState;
  private readonly selectedAnimes: string[];

  constructor(selectedAnimes: string[] = []) {
    this.selectedAnimes = selectedAnimes;
    this.state = {
      id: uuid(),
      phase: "LOBBY",
      deck: [],
      players: [],
      currentTurnPlayerId: null,
      winner: null,
    };
  }

  getState(): MatchState {
    return this.state;
  }

  // -------------------
  // Add Player
  // -------------------
  addPlayer(socketId: string): Player {
    if (this.state.players.length >= 2) {
      throw new Error("Match is full");
    }

    const player: Player = {
      id: uuid(),
      socketId,
      skipUsed: false,
      team: {},
      hasSwapped: false,
      pendingCard: null, // ✅ belongs to player
    };

    this.state.players.push(player);

    if (this.state.players.length === 2) {
      this.startDraft();
    }

    return player;
  }

  // -------------------
  // Start Draft
  // -------------------
  private startDraft() {
    this.state.phase = "DRAFT";
    this.state.deck = createDeck(this.selectedAnimes);

    const randomIndex = Math.floor(Math.random() * 2);
    this.state.currentTurnPlayerId = this.state.players[randomIndex].id;
  }

  private getCurrentPlayer(): Player {
    const player = this.state.players.find(
      (p) => p.id === this.state.currentTurnPlayerId,
    );

    if (!player) throw new Error("No active player");

    return player;
  }

  // -------------------
  // Draw
  // -------------------
  draw(playerId: string): Card {
    if (this.state.phase !== "DRAFT") throw new Error("Not in draft phase");

    if (playerId !== this.state.currentTurnPlayerId)
      throw new Error("Not your turn");

    const player = this.getCurrentPlayer();

    if (player.pendingCard) throw new Error("Resolve current card first");

    const card = drawCard(this.state.deck);
    if (!card) throw new Error("Deck empty");

    player.pendingCard = card;

    return card;
  }

  // -------------------
  // Assign
  // -------------------
  assign(playerId: string, role: Role) {
    if (this.state.phase !== "DRAFT") throw new Error("Not in draft phase");

    if (playerId !== this.state.currentTurnPlayerId)
      throw new Error("Not your turn");

    const player = this.getCurrentPlayer();

    if (!player.pendingCard) throw new Error("No card to assign");

    if (player.team[role]) throw new Error("Role already filled");

    player.team[role] = player.pendingCard;
    player.pendingCard = null;

    this.switchTurn();
    this.checkDraftCompletion();
  }

  // -------------------
  // Skip
  // -------------------
  skip(playerId: string): Card {
    if (this.state.phase !== "DRAFT") throw new Error("Not in draft phase");

    if (playerId !== this.state.currentTurnPlayerId)
      throw new Error("Not your turn");

    const player = this.getCurrentPlayer();

    if (!player.pendingCard) throw new Error("No card to skip");

    if (player.skipUsed) throw new Error("Skip already used");

    player.skipUsed = true;

    player.pendingCard = null;

    const card = drawCard(this.state.deck);
    if (!card) throw new Error("Deck empty");

    player.pendingCard = card;

    return card;
  }

  // -------------------
  // Swap
  // -------------------
  swap(playerId: string, roleA: Role, roleB: Role) {
    if (this.state.phase !== "SWAP") throw new Error("Not in swap phase");

    const player = this.state.players.find((p) => p.id === playerId);
    if (!player) throw new Error("Player not found");

    if (!canSwap(player)) throw new Error("Swap not allowed");

    if (!canSwapRoles(player, roleA, roleB))
      throw new Error("Invalid swap roles");

    const temp = player.team[roleA]!;
    player.team[roleA] = player.team[roleB]!;
    player.team[roleB] = temp;

    player.hasSwapped = true;
  }

  // -------------------
  // Finalize Swap
  // -------------------
  finalizeSwapPhase(playerId: string) {
    if (this.state.phase !== "SWAP") throw new Error("Not in swap phase");

    const player = this.state.players.find((p) => p.id === playerId);
    if (!player) throw new Error("Player not found");

    // Mark player done (confirm OR cancel)
    player.hasSwapped = true;

    const allDone = this.state.players.every((p) => p.skipUsed || p.hasSwapped);

    if (allDone) {
      this.startScoring();
    }
  }
  // -------------------
  // Scoring
  // -------------------
  private startScoring() {
    this.state.phase = "SCORING";

    const result = determineWinner(this.state.players);

    // ✅ Store scores on each player
    this.state.players.forEach((player) => {
      player.totalScore = result.scores[player.id] ?? 0;
    });

    this.state.winner = result.winnerId;

    this.state.phase = "FINISHED";
  }

  // -------------------
  // Turn Switch
  // -------------------
  private switchTurn() {
    const other = this.state.players.find(
      (p) => p.id !== this.state.currentTurnPlayerId,
    );

    if (other) {
      this.state.currentTurnPlayerId = other.id;
    }
  }

  // -------------------
  // Draft Completion
  // -------------------
  private checkDraftCompletion() {
    const complete = this.state.players.every((p) => isTeamComplete(p));

    if (complete) {
      this.state.phase = "SWAP";
      this.state.currentTurnPlayerId = null;
    }
  }

  // -------------------
  // Rebind socket (for reconnect)
  // -------------------
  rebindSocket(playerId: string, socketId: string) {
    const player = this.state.players.find((p) => p.id === playerId);

    if (!player) {
      throw new Error("Player not found for reconnect");
    }

    player.socketId = socketId;
  }
}
