import { DwarfDescription } from './DwarfDescription'

export type HeroDescription = DwarfDescription & {
  minGrades?: number;
};
