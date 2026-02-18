import { v4 as uuid } from "uuid";
import type { Card } from "./types.js";
import { baseCharacters } from "../data/characters.js";

// Fisher-Yates shuffle
function shuffle<T>(array: T[]): T[] {
  const copy = [...array];

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}

export function createDeck(): Card[] {
  const deck: Card[] = baseCharacters.map((char) => ({
    id: uuid(),
    ...char,
  }));

  return shuffle(deck);
}

export function drawCard(deck: Card[]): Card | null {
  if (deck.length === 0) return null;
  return deck.shift() ?? null;
}
