import { Effect } from '../effects/Effect';

export enum DwarfType {
  Warrior = 1,
  Hunter,
  Miner,
  Blacksmith,
  Explorer,
  Neutral,
}

export enum RoyalOffering {
  RoyalOffering,
}

export enum CardOrigin {
  Age1 = 1,
  Age2,
  Heroes,
}

export type Card = {
  origin: CardOrigin;
  type: DwarfType | RoyalOffering;
  copies?: number;
  bravery?: number[];
  minPlayers?: number;
  effects?: Effect[];
};
