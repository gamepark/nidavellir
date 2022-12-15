import MoveType from './MoveType';
import { CoinLocation } from '../state/LocatedCoin';

export type MoveCoin = {
  type: MoveType.MoveCoin;
  id?: number;
  source?: CoinLocation;
  target?: CoinLocation;
  reveal?: boolean;
};

export const revealCoinMove = (id: number): MoveCoin => ({
  type: MoveType.MoveCoin,
  id,
  reveal: true,
});

export const moveCoinAndRevealMove = (id: number, target: CoinLocation): MoveCoin => ({
  type: MoveType.MoveCoin,
  id,
  target,
  reveal: true,
});

export const moveKnownCoinMove = (id: number, target: CoinLocation): MoveCoin => ({
  type: MoveType.MoveCoin,
  id,
  target,
});

export const moveUnknownCoinMove = (source: CoinLocation, target: CoinLocation): MoveCoin => ({
  type: MoveType.MoveCoin,
  source,
  target,
});

export const moveCoinMove = (
  id?: number,
  target?: CoinLocation,
  source?: CoinLocation,
  reveal?: boolean
): MoveCoin => ({
  type: MoveType.MoveCoin,
  id,
  source,
  target,
  reveal,
});
