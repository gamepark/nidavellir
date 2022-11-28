import MoveType from './MoveType';
import { PlayerId } from '../state/Player';

export type PlaceCoin = {
  type: MoveType.PlaceCoin;
  player: PlayerId;
  coin: number;
  area: number;
};

export const placeCoinMove = (player: PlayerId, coin: number, area: number): PlaceCoin => ({
  type: MoveType.PlaceCoin,
  player,
  coin,
  area,
});
