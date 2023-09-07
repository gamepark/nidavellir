import { Grades } from './Grades';
import { isEnumValue } from "@gamepark/rules-api";
import { DwarfType } from "./DwarfType";
import { HeroDescription } from './HeroDescription'


export type DwarfDescription = {
  types: DwarfType | DwarfType[];
  grades?: Grades;
};

export const getTypes = (description: DwarfDescription | HeroDescription): DwarfType[] => {
  if (typeof description.types === 'number') return [description.types]
  return description.types
}


export const dwarfTypes = Object.values(DwarfType).filter<DwarfType>(isEnumValue).filter((type) => DwarfType.Neutral !== type)
