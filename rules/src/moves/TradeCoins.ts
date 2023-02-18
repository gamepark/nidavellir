import MoveType from './MoveType';
import { CoinLocation } from '../state/LocatedCoin';

export type TradeCoins = {
  type: MoveType.TradeCoins;
  ids: number[];
  sources?: CoinLocation[];
};

export const tradeCoinsMove = (ids: number[]): TradeCoins => ({
  type: MoveType.TradeCoins,
  ids,
});
