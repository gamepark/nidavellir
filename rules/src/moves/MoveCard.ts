import { CardLocation } from '../state/LocatedCard';
import MoveType from './MoveType';

export type MoveCard = {
  type: MoveType.MoveCard;
  id?: number;
  source?: CardLocation;
  target: CardLocation;
};

export const moveKnownCardMove = (id: number, target: CardLocation): MoveCard => ({
  type: MoveType.MoveCard,
  id,
  target,
});

export const moveUnknownCardMove = (source: CardLocation, target: CardLocation): MoveCard => ({
  type: MoveType.MoveCard,
  source,
  target,
});
