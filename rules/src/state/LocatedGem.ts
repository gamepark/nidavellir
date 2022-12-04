import { InDiscard, OnPlayerBoard } from './CommonLocations';

export type GemLocation = OnPlayerBoard | InDiscard;

export type LocatedGem = {
  id: number;
  location: GemLocation;
};
