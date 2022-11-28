import MoveType from './MoveType';

export type RevealCoins = {
  type: MoveType.RevealCoins;
  index: number;
};

export const revealCoinsMove = (index: number): RevealCoins => ({
  type: MoveType.RevealCoins,
  index,
});
