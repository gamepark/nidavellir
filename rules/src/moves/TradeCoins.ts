import MoveType from './MoveType'
import {CoinLocation} from '../state/LocatedCoin'
import {PlayerId} from '../state/Player'

export type TradeCoins = {
  type: MoveType.TradeCoins;
  player: PlayerId
  ids: number[];
  sources?: CoinLocation[];
};

export const tradeCoinsMove = (ids: number[], player: PlayerId): TradeCoins => ({
  type: MoveType.TradeCoins,
  ids,
  player
})
