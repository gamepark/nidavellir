import { LocationType } from './Location'
import { InDiscard, InDistinctionDeck, InPlayerHand } from './CommonLocations'
import { PlayerId } from './Player'
import { DwarfType } from '../cards/Card'

export type InAgeDeck = {
  type: LocationType.Age1Deck | LocationType.Age2Deck;
  index: number;
};

export type InHeroesDeck = {
  type: LocationType.HeroesDeck;
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

export type InArmy = {
  type: LocationType.Army;
  player: PlayerId;
  index?: number;
  column: DwarfType;
};

export type CardLocation =
  | InAgeDeck
  | InHeroesDeck
  | InArmy
  | InDistinctionDeck
  | InTavern
  | InDiscard
  | InCommandZone
  | InPlayerHand;

export type LocatedCard = {
  id: number;
  location: CardLocation;
  age?: number;
};
