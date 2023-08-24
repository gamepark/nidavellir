import { Player, PlayerId } from "../state/Player";

export const TAVERN_COUNT = 3;
export const MIN_DWARVES_PER_TAVERN = 3;


export const getCardByTavern = (players: (Player | PlayerId)[]) => Math.max(MIN_DWARVES_PER_TAVERN, players.length)
