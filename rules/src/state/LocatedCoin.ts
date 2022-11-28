import { LocationType } from './Location';
import { InDiscard, InPlayerHand, OnPlayerBoard } from './CommonLocations';

export type InTreasure = {
  type: LocationType.Treasure;
};

export type CoinLocation = InTreasure | InPlayerHand | OnPlayerBoard | InDiscard;

export type LocatedCoin = {
  id: number;
  location: CoinLocation;
  hidden?: boolean;
};
