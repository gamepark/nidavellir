import { Grades } from './Grades';
import { isEnumValue } from "@gamepark/rules-api";
import { DwarfType } from "./DwarfType";


export type DwarfDescription = {
  age?: number;
  type: DwarfType;
  copies?: number;
  grades?: Grades;
  minPlayers?: number;
};


export const dwarfTypes = Object.values(DwarfType).filter<DwarfType>(isEnumValue).filter((type) => DwarfType.Neutral !== type)
