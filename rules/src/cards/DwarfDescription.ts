import { getEnumValues } from '@gamepark/rules-api'
import { DwarfType } from './DwarfType'
import { Grades } from './Grades'
import { HeroDescription } from './HeroDescription'


export type DwarfDescription = {
  types: DwarfType | DwarfType[];
  grades?: Grades;
};

export const getTypes = (description: DwarfDescription | HeroDescription): DwarfType[] => {
  if (typeof description.types === 'number') return [description.types]
  return description.types
}


export const dwarfTypes = getEnumValues(DwarfType).filter((type) => DwarfType.Neutral !== type)
