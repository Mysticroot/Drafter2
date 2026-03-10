import { InMemoryMatchRepository } from "./inMemory/InMemoryMatchRepository.js";
import { InMemoryPlayerConnectionRepository } from "./inMemory/InMemoryPlayerConnectionRepository.js";
import { InMemoryRoomRepository } from "./inMemory/InMemoryRoomRepository.js";

export const repositories = {
  match: new InMemoryMatchRepository(),
  playerConnection: new InMemoryPlayerConnectionRepository(),
  room: new InMemoryRoomRepository(),
};
