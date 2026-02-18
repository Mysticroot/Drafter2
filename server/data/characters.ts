import type { Card } from "../game/types.js";
import { v4 as uuid } from "uuid";

export const baseCharacters: Omit<Card, "id">[] = [
  {
    name: "Monkey D. Luffy",
    anime: "One Piece",
    stats: {
      CAPTAIN: 98,
      VICE_CAPTAIN: 60,
      TANK: 85,
      HEALER: 5,
      SUPPORT: 75,
    },
  },
  {
    name: "Roronoa Zoro",
    anime: "One Piece",
    stats: {
      CAPTAIN: 80,
      VICE_CAPTAIN: 95,
      TANK: 90,
      HEALER: 5,
      SUPPORT: 60,
    },
  },
  {
    name: "Naruto Uzumaki",
    anime: "Naruto",
    stats: {
      CAPTAIN: 95,
      VICE_CAPTAIN: 85,
      TANK: 80,
      HEALER: 10,
      SUPPORT: 90,
    },
  },
  {
    name: "Sasuke Uchiha",
    anime: "Naruto",
    stats: {
      CAPTAIN: 88,
      VICE_CAPTAIN: 92,
      TANK: 75,
      HEALER: 5,
      SUPPORT: 70,
    },
  },
  {
    name: "Sakura Haruno",
    anime: "Naruto",
    stats: {
      CAPTAIN: 60,
      VICE_CAPTAIN: 65,
      TANK: 70,
      HEALER: 95,
      SUPPORT: 80,
    },
  },
  {
    name: "Ichigo Kurosaki",
    anime: "Bleach",
    stats: {
      CAPTAIN: 92,
      VICE_CAPTAIN: 80,
      TANK: 85,
      HEALER: 5,
      SUPPORT: 75,
    },
  },
  {
    name: "Rukia Kuchiki",
    anime: "Bleach",
    stats: {
      CAPTAIN: 70,
      VICE_CAPTAIN: 85,
      TANK: 65,
      HEALER: 60,
      SUPPORT: 80,
    },
  },
  {
    name: "Byakuya Kuchiki",
    anime: "Bleach",
    stats: {
      CAPTAIN: 90,
      VICE_CAPTAIN: 88,
      TANK: 80,
      HEALER: 10,
      SUPPORT: 75,
    },
  },
  {
    name: "Nami",
    anime: "One Piece",
    stats: {
      CAPTAIN: 65,
      VICE_CAPTAIN: 70,
      TANK: 55,
      HEALER: 75,
      SUPPORT: 85,
    },
  },
  {
    name: "Usopp",
    anime: "One Piece",
    stats: {
      CAPTAIN: 55,
      VICE_CAPTAIN: 60,
      TANK: 50,
      HEALER: 65,
      SUPPORT: 88,
    },
  },
  {
    name: "Kakashi Hatake",
    anime: "Naruto",
    stats: {
      CAPTAIN: 85,
      VICE_CAPTAIN: 88,
      TANK: 75,
      HEALER: 60,
      SUPPORT: 90,
    },
  },
  {
    name: "Jiraiya",
    anime: "Naruto",
    stats: {
      CAPTAIN: 80,
      VICE_CAPTAIN: 78,
      TANK: 80,
      HEALER: 40,
      SUPPORT: 75,
    },
  },
  {
    name: "Madara Uchiha",
    anime: "Naruto",
    stats: {
      CAPTAIN: 98,
      VICE_CAPTAIN: 95,
      TANK: 95,
      HEALER: 5,
      SUPPORT: 70,
    },
  },
  {
    name: "Soi Fon",
    anime: "Bleach",
    stats: {
      CAPTAIN: 75,
      VICE_CAPTAIN: 82,
      TANK: 70,
      HEALER: 40,
      SUPPORT: 75,
    },
  },
  {
    name: "Toshiro Hitsugaya",
    anime: "Bleach",
    stats: {
      CAPTAIN: 85,
      VICE_CAPTAIN: 88,
      TANK: 80,
      HEALER: 45,
      SUPPORT: 80,
    },
  },
  {
    name: "Sosuke Aizen",
    anime: "Bleach",
    stats: {
      CAPTAIN: 96,
      VICE_CAPTAIN: 92,
      TANK: 85,
      HEALER: 20,
      SUPPORT: 85,
    },
  },
];
