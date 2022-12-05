import { DwarfType } from './Card';
import { Effect } from '../effects/Effect';

export enum HeroType {
  Neutral,
}

export type Hero = {
  type: DwarfType | HeroType;
  bravery?: number[];
  effects?: Effect[];
};
