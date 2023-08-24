import { DwarfType } from './DwarfDescription';
import { HeroType } from './HeroDescription';

export type Grades = Record<DwarfType & HeroType, number[]>;
