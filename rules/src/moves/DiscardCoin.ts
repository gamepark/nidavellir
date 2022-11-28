import MoveType from './MoveType';

export type DiscardCoin = {
  type: MoveType.DiscardCoin;
  id: number;
};

export const discardCoin = (id: number): DiscardCoin => ({
  type: MoveType.DiscardCoin,
  id,
});
