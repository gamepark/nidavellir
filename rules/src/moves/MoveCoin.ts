import MoveType from './MoveType';
import { CoinLocation } from '../state/LocatedCoin';

export type MoveCoin = {
  type: MoveType.MoveCoin;
  id?: number;
  source?: CoinLocation;
  target: CoinLocation;
};

export const moveCoinMove = (target: CoinLocation, id?: number, source?: CoinLocation): MoveCoin => ({
  type: MoveType.MoveCoin,
  id,
  source,
  target,
});

export type MoveCoinInView = Omit<MoveCoin, 'id'>;
