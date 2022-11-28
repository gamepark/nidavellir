import { LocationType } from './Location';
import { PlayerId } from './Player';

export type OnPlayerBoard = {
  type: LocationType.PlayerBoard;
  player: PlayerId;
  index?: number;
};

export type InPlayerHand = {
  type: LocationType.PlayerHand;
  player: PlayerId;
  // Index is set when the player has placed it on its board
  index?: number;
};

export type InDiscard = {
  type: LocationType.Discard;
  index: number;
};
