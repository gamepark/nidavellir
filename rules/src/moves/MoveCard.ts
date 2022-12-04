import { CardLocation } from '../state/LocatedCard';
import MoveType from './MoveType';

export type MoveCard = {
  type: MoveType.MoveCard;
  id?: number;
  source?: CardLocation;
  target: CardLocation;
};

export const moveCardMove = (target: CardLocation, id?: number, source?: CardLocation): MoveCard => ({
  type: MoveType.MoveCard,
  id,
  source,
  target,
});

export type MoveCardInView = MoveCard & {
  id: number;
};
