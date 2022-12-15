import { DwarfType } from './Card';
import { Effect } from '../effects/Effect';

export enum HeroType {
  Neutral = 7,
}

export type Hero = {
  type: DwarfType | HeroType;
  bravery?: number[];
  effects?: Effect[];
};
