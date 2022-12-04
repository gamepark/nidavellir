import MoveType from './MoveType';
import { CardLocation } from '../state/LocatedCard';

export type MoveHero = {
  type: MoveType.MoveHero;
  id: number;
  target: CardLocation;
};

export const moveHeroMove = (id: number, target: CardLocation): MoveHero => ({
  type: MoveType.MoveHero,
  id,
  target,
});
