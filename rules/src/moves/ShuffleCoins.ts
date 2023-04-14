import MoveType from './MoveType'

export type ShuffleCoins = {
  type: MoveType.ShuffleCoins;
  coins: number[];
};

export type ShuffleCoinsRandomized = ShuffleCoins & {
  shuffledCoins: number[];
};

export const shuffleCoinMove = (coins: number[]): ShuffleCoins => ({
  type: MoveType.ShuffleCoins,
  coins
})
