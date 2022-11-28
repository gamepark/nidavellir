import MoveType from './MoveType';

export type TookCoinFromTreasure = {
  type: MoveType.TookCoinFromTreasure;
  id: number;
};

export const tookCoinFromTreasureMove = (id: number): TookCoinFromTreasure => ({
  type: MoveType.TookCoinFromTreasure,
  id,
});
