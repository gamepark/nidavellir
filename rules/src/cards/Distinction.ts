import { DwarfType } from './Card';
import { Effect } from '../effects/Effect';

export type Distinction = {
  majorityOf: DwarfType;
  effects?: Effect[];
};
