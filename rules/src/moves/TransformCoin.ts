import MoveType from './MoveType';
import { CoinLocation } from '../state/LocatedCoin';

export type TransformCoin = {
  type: MoveType.TransformCoin;

  source?: CoinLocation;
  id: number;
};

export const transformCoinMove = (id: number): TransformCoin => ({
  type: MoveType.TransformCoin,
  id,
});
