import MoveType from './MoveType';
import { GemLocation } from '../state/LocatedGem';

export type MoveGem = {
  type: MoveType.MoveGem;
  id: number;
  target: GemLocation;
};

export const moveGemMove = (id: number, target: GemLocation): MoveGem => ({
  type: MoveType.MoveGem,
  id,
  target,
});
