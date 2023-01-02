import { LocationType } from './Location';
import { InDiscard, OnPlayerBoard } from './CommonLocations';
import { PlayerId } from './Player';
import { DwarfType } from '../cards/Card';
import { HeroType } from '../cards/Hero';

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
  tavern: number;
};

export type InCommandZone = {
  type: LocationType.CommandZone;
  player: PlayerId;
  index: number;
};

export type OnPlayerBoardCard = OnPlayerBoard & {
  column: DwarfType | HeroType;
};

export type CardLocation =
  | InAgeDeck
  | InHeroesDeck
  | OnPlayerBoardCard
  | InDistinctionDeck
  | InTavern
  | InDiscard
  | InCommandZone;

export type LocatedCard = {
  id: number;
  location: CardLocation;
};