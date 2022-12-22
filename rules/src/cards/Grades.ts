import { DwarfType } from './Card';
import { HeroType } from './Hero';

export type Grades = Record<DwarfType & HeroType, number[]>;
