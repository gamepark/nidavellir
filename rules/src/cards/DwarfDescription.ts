import { Grades } from './Grades';
import { isEnumValue } from "@gamepark/rules-api";
import { DwarfType } from "./DwarfType";


export type DwarfDescription = {
  type: DwarfType;
  grades?: Grades;
};


export const dwarfTypes = Object.values(DwarfType).filter<DwarfType>(isEnumValue).filter((type) => DwarfType.Neutral !== type)
