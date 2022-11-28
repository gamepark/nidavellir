import { OnPlayerBoard } from './CommonLocations';

export type GemLocation = OnPlayerBoard;

export type LocatedGem = {
  id: number;
  location: GemLocation;
};
