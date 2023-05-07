import MoveType from './MoveType'
import { PlayerId } from '../state/Player'
import { CoinLocation } from '../state/LocatedCoin'

export type ShuffleCoins = {
  type: MoveType.ShuffleCoins;
  ids: number[];
  player: PlayerId;

  sources?: CoinLocation[]
};

export type ShuffleCoinsRandomized = ShuffleCoins & {
  shuffledIds: number[];
};

export const shuffleCoinMove = (ids: number[], player: PlayerId): ShuffleCoins => ({
  type: MoveType.ShuffleCoins,
  ids,
  player
})
