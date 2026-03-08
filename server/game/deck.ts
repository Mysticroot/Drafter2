import { v4 as uuid } from "uuid";
import type { Card } from "./types.js";
import { baseCharacters } from "../data/characters.js";

function normalizeAnimePool(selectedAnimes?: string[]): string[] {
  if (!selectedAnimes || selectedAnimes.length === 0) {
    return [];
  }

  const availableAnimes = new Set(baseCharacters.map((char) => char.anime));

  return Array.from(new Set(selectedAnimes)).filter((anime) =>
    availableAnimes.has(anime),
  );
}

export function resolveDeckSourceCharacters(selectedAnimes?: string[]) {
  const animePool = normalizeAnimePool(selectedAnimes);

  if (animePool.length === 0) {
    return baseCharacters;
  }

  return baseCharacters.filter((char) => animePool.includes(char.anime));
}

export function getDeckCardCount(selectedAnimes?: string[]): number {
  return resolveDeckSourceCharacters(selectedAnimes).length;
}

// Fisher-Yates shuffle
function shuffle<T>(array: T[]): T[] {
  const copy = [...array];

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}

export function createDeck(selectedAnimes?: string[]): Card[] {
  const sourceCharacters = resolveDeckSourceCharacters(selectedAnimes);

  const deck: Card[] = sourceCharacters.map((char) => ({
    id: uuid(),
    ...char,
  }));

  return shuffle(deck);
}

export function drawCard(deck: Card[]): Card | null {
  if (deck.length === 0) return null;
  return deck.shift() ?? null;
}
