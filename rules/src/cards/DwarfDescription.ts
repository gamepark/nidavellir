import { Effect } from '../effects/Effect';
import { Grades } from './Grades';
import { isEnumValue } from "@gamepark/rules-api";

export enum DwarfType {
  Blacksmith = 1,
  Hunter,
  Explorer,
  Miner,
  Warrior,
  Neutral
}

export type DwarfDescription = {
  age?: number;
  type: DwarfType;
  copies?: number;
  grades?: Grades;
  minPlayers?: number;
  effects?: Effect[];
};


export const dwarfTypes = Object.values(DwarfType).filter<DwarfType>(isEnumValue).filter((type) => DwarfType.Neutral !== type)
