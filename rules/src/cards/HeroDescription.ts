import { DwarfType } from './DwarfDescription';
import { Grades } from './Grades';

export type HeroDescription = {
  type: DwarfType;
  grades?: Grades;
  minGrades?: number;
};
