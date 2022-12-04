import MoveType from './MoveType';
import { CardLocation } from '../state/LocatedCard';

export type MoveDistinction = {
  type: MoveType.MoveDistinction;
  id: number;
  target: CardLocation;
};

export const moveDistinctionMove = (id: number, target: CardLocation): MoveDistinction => ({
  type: MoveType.MoveDistinction,
  id,
  target,
});
