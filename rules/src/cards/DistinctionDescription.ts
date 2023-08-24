import { DwarfType } from './DwarfDescription';
import { Effect } from '../effects/Effect';

export type DistinctionDescription = {
  majorityOf: DwarfType;
  effects?: Effect[];
};
