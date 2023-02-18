import { LocationType } from './Location';
import { InDiscard, InDistinctionDeck, InPlayerHand, OnPlayerBoard } from './CommonLocations';

export type InTreasure = {
  type: LocationType.Treasure;
  z: number;
};

export type CoinLocation = InTreasure | InPlayerHand | OnPlayerBoard | InDiscard | InDistinctionDeck;

export type LocatedCoin = {
  id: number;
  location: CoinLocation;
  hidden?: boolean;
};
