import MoveType from './MoveType';
import { PlayerId } from '../state/Player';

export type Pass = {
  type: MoveType.Pass;
  player: PlayerId;
};

export const passMove = (player: PlayerId): Pass => ({
  type: MoveType.Pass,
  player,
});
