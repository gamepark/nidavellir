import { Effect } from '../effects/Effect';
import { Grades } from './Grades';

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
  grades?: Grades;
  minPlayers?: number;
  effects?: Effect[];
};
