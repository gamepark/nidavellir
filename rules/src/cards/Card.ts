import { Effect } from '../effects/Effect';

export enum DwarfType {
  Blacksmith = 1,
  Hunter,
  Explorer,
  Miner,
  Warrior,
}

export enum RoyalOffering {
  RoyalOffering = 6,
}

export type Card = {
  age: number;
  type: DwarfType | RoyalOffering;
  copies?: number;
  bravery?: number[];
  minPlayers?: number;
  effects?: Effect[];
};
