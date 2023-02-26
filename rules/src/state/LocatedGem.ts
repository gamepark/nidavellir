import { InDiscard, InDistinctionDeck, OnPlayerBoard } from './CommonLocations';

export type GemLocation = OnPlayerBoard | InDiscard | InDistinctionDeck;

export type LocatedGem = {
  id: number;
  location: GemLocation;
};
