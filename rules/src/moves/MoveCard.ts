import { CardLocation } from '../state/LocatedCard'
import MoveType from './MoveType'
import { PlayerId } from '../state/Player'

export type MoveCard = {
  type: MoveType.MoveCard;
  id?: number;
  player?: PlayerId;
  source?: CardLocation;
  target: CardLocation;

  age?: number
  reveal?: boolean;
};

export const moveKnownCardMove = (id: number, target: CardLocation, player?: PlayerId): MoveCard => ({
  type: MoveType.MoveCard,
  id,
  target,
  player
})

export const moveCardAndRevealMove = (id: number, target: CardLocation, player: PlayerId): MoveCard => ({
  type: MoveType.MoveCard,
  id,
  target,
  reveal: true,
  player
})
