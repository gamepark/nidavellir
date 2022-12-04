import MoveType from './MoveType';
import { LocatedCoin } from '../state/LocatedCoin';

export type RevealCoin = {
  type: MoveType.RevealCoin;
  id: number;
};

export const revealCoinMove = (id: number): RevealCoin => ({
  type: MoveType.RevealCoin,
  id,
});

export type RevealCoinInView = RevealCoin & LocatedCoin;
