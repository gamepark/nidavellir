import MoveType from './MoveType'
import {CardLocation} from '../state/LocatedCard'
import {PlayerId} from '../state/Player'

export type MoveDistinction = {
  type: MoveType.MoveDistinction;
  player: PlayerId
  id: number;
  target: CardLocation;
};

export const moveDistinctionMove = (id: number, target: CardLocation, player: PlayerId): MoveDistinction => ({
  type: MoveType.MoveDistinction,
  id,
  target,
  player
})
