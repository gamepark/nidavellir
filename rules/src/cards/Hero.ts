import { DwarfType } from './Card';

export enum HeroType {
  Neutral,
}

export type Hero = {
  type: DwarfType | HeroType;
  bravery?: number[];
};
