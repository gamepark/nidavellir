import { DwarfType } from './DwarfType';
import { Grades } from './Grades';

export type HeroDescription = {
  type: DwarfType;
  grades?: Grades;
  minGrades?: number;
};
