import MoveType from './MoveType'
import {GemLocation} from '../state/LocatedGem'
import {PlayerId} from '../state/Player'

export type MoveGem = {
  type: MoveType.MoveGem;
  player: PlayerId
  id: number;
  target: GemLocation;
};

export const moveGemMove = (id: number, target: GemLocation, player: PlayerId): MoveGem => ({
  type: MoveType.MoveGem,
  id,
  target,
  player
})
