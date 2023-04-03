import MoveType from './MoveType'
import {CoinLocation} from '../state/LocatedCoin'
import {PlayerId} from '../state/Player'

export type TransformCoin = {
  type: MoveType.TransformCoin;
  player: PlayerId;
  source?: CoinLocation;
  id: number;
};

export const transformCoinMove = (id: number, player: PlayerId): TransformCoin => ({
  type: MoveType.TransformCoin,
  id,
  player
})
