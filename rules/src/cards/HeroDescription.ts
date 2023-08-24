import { DwarfType } from './DwarfDescription';
import { Effect } from '../effects/Effect';
import { Grades } from './Grades';

export type HeroDescription = {
  type: DwarfType;
  grades?: Grades;
  effects?: Effect[];
  minGrades?: number;
};
