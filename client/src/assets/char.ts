import type { Card } from "../game/types.js";

export const baseCharacters: Omit<Card, "id">[] = [
  // ---------------- ONE PIECE (20) ----------------
  {
    name: "Monkey D. Luffy",
    anime: "One Piece",
    image: "/characters/luffy.png",
    stats: { CAPTAIN: 98, VICE_CAPTAIN: 80, TANK: 90, HEALER: 5, SUPPORT: 80 },
  },

  {
    name: "Roronoa Zoro",
    anime: "One Piece",
    image: "/characters/zoro.png",
    stats: { CAPTAIN: 85, VICE_CAPTAIN: 95, TANK: 92, HEALER: 5, SUPPORT: 65 },
  },

  {
    name: "Sanji",
    anime: "One Piece",
    image: "/characters/sanji.png",
    stats: { CAPTAIN: 82, VICE_CAPTAIN: 90, TANK: 85, HEALER: 5, SUPPORT: 70 },
  },

  {
    name: "Nami",
    anime: "One Piece",
    image: "/characters/nami.png",
    stats: { CAPTAIN: 65, VICE_CAPTAIN: 70, TANK: 55, HEALER: 75, SUPPORT: 90 },
  },

  {
    name: "Usopp",
    anime: "One Piece",
    image: "/characters/usopp.png",
    stats: { CAPTAIN: 55, VICE_CAPTAIN: 65, TANK: 50, HEALER: 60, SUPPORT: 88 },
  },

  {
    name: "Tony Tony Chopper",
    anime: "One Piece",
    image: "/characters/chopper.png",
    stats: { CAPTAIN: 60, VICE_CAPTAIN: 65, TANK: 70, HEALER: 98, SUPPORT: 85 },
  },

  {
    name: "Nico Robin",
    anime: "One Piece",
    image: "/characters/robin.png",
    stats: { CAPTAIN: 70, VICE_CAPTAIN: 78, TANK: 60, HEALER: 40, SUPPORT: 88 },
  },

  {
    name: "Franky",
    anime: "One Piece",
    image: "/characters/franky.png",
    stats: { CAPTAIN: 72, VICE_CAPTAIN: 75, TANK: 95, HEALER: 10, SUPPORT: 65 },
  },

  {
    name: "Brook",
    anime: "One Piece",
    image: "/characters/brook.png",
    stats: { CAPTAIN: 68, VICE_CAPTAIN: 70, TANK: 65, HEALER: 30, SUPPORT: 85 },
  },

  {
    name: "Jinbe",
    anime: "One Piece",
    image: "/characters/jinbe.png",
    stats: { CAPTAIN: 80, VICE_CAPTAIN: 82, TANK: 95, HEALER: 10, SUPPORT: 70 },
  },

  {
    name: "Shanks",
    anime: "One Piece",
    image: "/characters/shanks.png",
    stats: { CAPTAIN: 97, VICE_CAPTAIN: 90, TANK: 85, HEALER: 10, SUPPORT: 85 },
  },

  {
    name: "Dracule Mihawk",
    anime: "One Piece",
    image: "/characters/mihawk.png",
    stats: { CAPTAIN: 92, VICE_CAPTAIN: 95, TANK: 85, HEALER: 5, SUPPORT: 70 },
  },

  {
    name: "Trafalgar Law",
    anime: "One Piece",
    image: "/characters/law.png",
    stats: { CAPTAIN: 85, VICE_CAPTAIN: 88, TANK: 75, HEALER: 85, SUPPORT: 90 },
  },

  {
    name: "Portgas D. Ace",
    anime: "One Piece",
    image: "/characters/ace.png",
    stats: { CAPTAIN: 90, VICE_CAPTAIN: 85, TANK: 85, HEALER: 5, SUPPORT: 70 },
  },

  {
    name: "Sabo",
    anime: "One Piece",
    image: "/characters/sabo.png",
    stats: { CAPTAIN: 88, VICE_CAPTAIN: 85, TANK: 80, HEALER: 5, SUPPORT: 75 },
  },

  {
    name: "Kaido",
    anime: "One Piece",
    image: "/characters/kaido.png",
    stats: { CAPTAIN: 99, VICE_CAPTAIN: 90, TANK: 99, HEALER: 5, SUPPORT: 65 },
  },

  {
    name: "Big Mom",
    anime: "One Piece",
    image: "/characters/bigmom.png",
    stats: { CAPTAIN: 97, VICE_CAPTAIN: 88, TANK: 95, HEALER: 20, SUPPORT: 70 },
  },

  {
    name: "Donquixote Doflamingo",
    anime: "One Piece",
    image: "/characters/doflamingo.png",
    stats: { CAPTAIN: 90, VICE_CAPTAIN: 85, TANK: 80, HEALER: 5, SUPPORT: 85 },
  },

  {
    name: "Crocodile",
    anime: "One Piece",
    image: "/characters/crocodile.png",
    stats: { CAPTAIN: 88, VICE_CAPTAIN: 80, TANK: 80, HEALER: 5, SUPPORT: 75 },
  },

  {
    name: "Whitebeard",
    anime: "One Piece",
    image: "/characters/whitebeard.png",
    stats: { CAPTAIN: 100, VICE_CAPTAIN: 92, TANK: 98, HEALER: 5, SUPPORT: 80 },
  },

  // ---------------- NARUTO (12) ----------------
  {
    name: "Naruto Uzumaki",
    anime: "Naruto",
    image: "/characters/naruto.png",
    stats: { CAPTAIN: 98, VICE_CAPTAIN: 90, TANK: 85, HEALER: 10, SUPPORT: 92 },
  },

  {
    name: "Sasuke Uchiha",
    anime: "Naruto",
    image: "/characters/sasuke.png",
    stats: { CAPTAIN: 92, VICE_CAPTAIN: 95, TANK: 80, HEALER: 5, SUPPORT: 75 },
  },

  {
    name: "Sakura Haruno",
    anime: "Naruto",
    image: "/characters/sakura.png",
    stats: { CAPTAIN: 65, VICE_CAPTAIN: 70, TANK: 85, HEALER: 95, SUPPORT: 80 },
  },

  {
    name: "Kakashi Hatake",
    anime: "Naruto",
    image: "/characters/kakashi.png",
    stats: { CAPTAIN: 85, VICE_CAPTAIN: 88, TANK: 78, HEALER: 60, SUPPORT: 92 },
  },

  {
    name: "Jiraiya",
    anime: "Naruto",
    image: "/characters/jiraiya.png",
    stats: { CAPTAIN: 85, VICE_CAPTAIN: 80, TANK: 85, HEALER: 40, SUPPORT: 78 },
  },

  {
    name: "Madara Uchiha",
    anime: "Naruto",
    image: "/characters/madara.png",
    stats: { CAPTAIN: 99, VICE_CAPTAIN: 95, TANK: 95, HEALER: 5, SUPPORT: 75 },
  },

  {
    name: "Itachi Uchiha",
    anime: "Naruto",
    image: "/characters/itachi.png",
    stats: { CAPTAIN: 92, VICE_CAPTAIN: 90, TANK: 75, HEALER: 20, SUPPORT: 88 },
  },

  {
    name: "Minato Namikaze",
    anime: "Naruto",
    image: "/characters/minato.png",
    stats: { CAPTAIN: 94, VICE_CAPTAIN: 90, TANK: 78, HEALER: 15, SUPPORT: 85 },
  },

  {
    name: "Tsunade",
    anime: "Naruto",
    image: "/characters/tsunade.png",
    stats: { CAPTAIN: 88, VICE_CAPTAIN: 85, TANK: 90, HEALER: 97, SUPPORT: 75 },
  },

  {
    name: "Gaara",
    anime: "Naruto",
    image: "/characters/gaara.png",
    stats: { CAPTAIN: 85, VICE_CAPTAIN: 80, TANK: 96, HEALER: 10, SUPPORT: 70 },
  },

  {
    name: "Obito Uchiha",
    anime: "Naruto",
    image: "/characters/obito.png",
    stats: { CAPTAIN: 92, VICE_CAPTAIN: 88, TANK: 88, HEALER: 10, SUPPORT: 80 },
  },

  {
    name: "Pain (Nagato)",
    anime: "Naruto",
    image: "/characters/pain.png",
    stats: { CAPTAIN: 96, VICE_CAPTAIN: 90, TANK: 90, HEALER: 20, SUPPORT: 85 },
  },

  // ---------------- DRAGON BALL (8) ----------------
  {
    name: "Goku",
    anime: "Dragon Ball",
    image: "/characters/goku.png",
    stats: { CAPTAIN: 99, VICE_CAPTAIN: 92, TANK: 95, HEALER: 5, SUPPORT: 70 },
  },

  {
    name: "Vegeta",
    anime: "Dragon Ball",
    image: "/characters/vegeta.png",
    stats: { CAPTAIN: 95, VICE_CAPTAIN: 98, TANK: 90, HEALER: 5, SUPPORT: 65 },
  },

  {
    name: "Gohan",
    anime: "Dragon Ball",
    image: "/characters/gohan.png",
    stats: { CAPTAIN: 92, VICE_CAPTAIN: 85, TANK: 85, HEALER: 10, SUPPORT: 70 },
  },

  {
    name: "Piccolo",
    anime: "Dragon Ball",
    image: "/characters/piccolo.png",
    stats: { CAPTAIN: 85, VICE_CAPTAIN: 88, TANK: 92, HEALER: 40, SUPPORT: 80 },
  },

  {
    name: "Frieza",
    anime: "Dragon Ball",
    image: "/characters/frieza.png",
    stats: { CAPTAIN: 96, VICE_CAPTAIN: 90, TANK: 85, HEALER: 5, SUPPORT: 75 },
  },

  {
    name: "Broly",
    anime: "Dragon Ball",
    image: "/characters/broly.png",
    stats: { CAPTAIN: 97, VICE_CAPTAIN: 88, TANK: 99, HEALER: 5, SUPPORT: 60 },
  },

  {
    name: "Beerus",
    anime: "Dragon Ball",
    image: "/characters/beerus.png",
    stats: { CAPTAIN: 98, VICE_CAPTAIN: 92, TANK: 90, HEALER: 5, SUPPORT: 80 },
  },

  {
    name: "Trunks",
    anime: "Dragon Ball",
    image: "/characters/trunks.png",
    stats: { CAPTAIN: 85, VICE_CAPTAIN: 88, TANK: 80, HEALER: 10, SUPPORT: 75 },
  },
  // ---------------- HUNTER X HUNTER (10) ----------------
  {
    name: "Gon Freecss",
    anime: "Hunter x Hunter",
    image: "/characters/gon.png",
    stats: { CAPTAIN: 88, VICE_CAPTAIN: 80, TANK: 85, HEALER: 10, SUPPORT: 70 },
  },
  {
    name: "Killua Zoldyck",
    anime: "Hunter x Hunter",
    image: "/characters/killua.png",
    stats: { CAPTAIN: 85, VICE_CAPTAIN: 92, TANK: 75, HEALER: 5, SUPPORT: 80 },
  },
  {
    name: "Kurapika",
    anime: "Hunter x Hunter",
    image: "/characters/kurapika.png",
    stats: { CAPTAIN: 86, VICE_CAPTAIN: 88, TANK: 80, HEALER: 25, SUPPORT: 85 },
  },
  {
    name: "Leorio",
    anime: "Hunter x Hunter",
    image: "/characters/leorio.png",
    stats: { CAPTAIN: 60, VICE_CAPTAIN: 65, TANK: 70, HEALER: 85, SUPPORT: 75 },
  },
  {
    name: "Hisoka",
    anime: "Hunter x Hunter",
    image: "/characters/hisoka.png",
    stats: { CAPTAIN: 90, VICE_CAPTAIN: 88, TANK: 75, HEALER: 5, SUPPORT: 80 },
  },
  {
    name: "Chrollo Lucilfer",
    anime: "Hunter x Hunter",
    image: "/characters/chrollo.png",
    stats: { CAPTAIN: 92, VICE_CAPTAIN: 90, TANK: 80, HEALER: 5, SUPPORT: 90 },
  },
  {
    name: "Isaac Netero",
    anime: "Hunter x Hunter",
    image: "/characters/netero.png",
    stats: { CAPTAIN: 95, VICE_CAPTAIN: 88, TANK: 90, HEALER: 5, SUPPORT: 75 },
  },
  {
    name: "Meruem",
    anime: "Hunter x Hunter",
    image: "/characters/meruem.png",
    stats: { CAPTAIN: 98, VICE_CAPTAIN: 90, TANK: 98, HEALER: 5, SUPPORT: 65 },
  },
  {
    name: "Illumi Zoldyck",
    anime: "Hunter x Hunter",
    image: "/characters/illumi.png",
    stats: { CAPTAIN: 85, VICE_CAPTAIN: 87, TANK: 78, HEALER: 10, SUPPORT: 85 },
  },
  {
    name: "Kite",
    anime: "Hunter x Hunter",
    image: "/characters/kite.png",
    stats: { CAPTAIN: 84, VICE_CAPTAIN: 82, TANK: 80, HEALER: 20, SUPPORT: 75 },
  },

  // ---------------- BLACK CLOVER (10) ----------------
  {
    name: "Asta",
    anime: "Black Clover",
    image: "/characters/asta.png",
    stats: { CAPTAIN: 92, VICE_CAPTAIN: 88, TANK: 90, HEALER: 5, SUPPORT: 70 },
  },
  {
    name: "Yuno",
    anime: "Black Clover",
    image: "/characters/yuno.png",
    stats: { CAPTAIN: 90, VICE_CAPTAIN: 92, TANK: 80, HEALER: 5, SUPPORT: 75 },
  },
  {
    name: "Noelle Silva",
    anime: "Black Clover",
    image: "/characters/noelle.png",
    stats: { CAPTAIN: 85, VICE_CAPTAIN: 88, TANK: 85, HEALER: 30, SUPPORT: 80 },
  },
  {
    name: "Yami Sukehiro",
    anime: "Black Clover",
    image: "/characters/yami.png",
    stats: { CAPTAIN: 94, VICE_CAPTAIN: 90, TANK: 92, HEALER: 5, SUPPORT: 70 },
  },
  {
    name: "Julius Novachrono",
    anime: "Black Clover",
    image: "/characters/julius.png",
    stats: { CAPTAIN: 97, VICE_CAPTAIN: 92, TANK: 85, HEALER: 20, SUPPORT: 90 },
  },
  {
    name: "Mereoleona Vermillion",
    anime: "Black Clover",
    image: "/characters/mereoleona.png",
    stats: { CAPTAIN: 95, VICE_CAPTAIN: 90, TANK: 95, HEALER: 5, SUPPORT: 65 },
  },
  {
    name: "Fuegoleon Vermillion",
    anime: "Black Clover",
    image: "/characters/fuegoleon.png",
    stats: { CAPTAIN: 90, VICE_CAPTAIN: 88, TANK: 88, HEALER: 5, SUPPORT: 75 },
  },
  {
    name: "Luck Voltia",
    anime: "Black Clover",
    image: "/characters/luck.png",
    stats: { CAPTAIN: 82, VICE_CAPTAIN: 85, TANK: 75, HEALER: 5, SUPPORT: 80 },
  },
  {
    name: "Finral Roulacase",
    anime: "Black Clover",
    image: "/characters/finral.png",
    stats: { CAPTAIN: 60, VICE_CAPTAIN: 70, TANK: 50, HEALER: 60, SUPPORT: 95 },
  },
  {
    name: "Licht",
    anime: "Black Clover",
    image: "/characters/licht.png",
    stats: { CAPTAIN: 96, VICE_CAPTAIN: 90, TANK: 90, HEALER: 5, SUPPORT: 85 },
  },
];
