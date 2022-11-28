import { LocationType } from './Location';
import { InDiscard, OnPlayerBoard } from './CommonLocations';

export type InAgeDeck = {
  type: LocationType.Age1Deck | LocationType.Age2Deck;
  index: number;
};

export type InHeroesDeck = {
  type: LocationType.HeroesDeck;
  index: number;
};

export type InDistinctionDeck = {
  type: LocationType.DistinctionsDeck;
  index: number;
};

export type InTavern = {
  type: LocationType.Tavern;
  index: number;
  //TODO: enum ?
  tavern: number;
};

export type CardLocation = InAgeDeck | InHeroesDeck | OnPlayerBoard | InDistinctionDeck | InTavern | InDiscard;

export type LocatedCard = {
  id: number;
  location: CardLocation;
};
