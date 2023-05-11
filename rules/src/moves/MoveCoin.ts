import MoveType from './MoveType'
import { CoinLocation } from '../state/LocatedCoin'
import { PlayerId } from '../state/Player'

export type MoveCoin = {
  type: MoveType.MoveCoin;
  player?: PlayerId;
  id?: number;
  source?: CoinLocation;
  target?: CoinLocation;
  reveal?: boolean;
  hide?: boolean;
};

export const revealCoinMove = (id: number, player?: PlayerId): MoveCoin => ({
  type: MoveType.MoveCoin,
  id,
  reveal: true,
  player
})

export const hideCoinMove = (id: number, player: PlayerId): MoveCoin => ({
  type: MoveType.MoveCoin,
  id,
  hide: true,
  player
})

export const moveCoinAndRevealMove = (id: number, target: CoinLocation, player: PlayerId): MoveCoin => ({
  type: MoveType.MoveCoin,
  id,
  target,
  reveal: true,
  player
})

export const moveCoinAndHideMove = (id: number, target: CoinLocation, player: PlayerId): MoveCoin => ({
  type: MoveType.MoveCoin,
  id,
  target,
  hide: true,
  player
})

export const moveKnownCoinMove = (id: number, target: CoinLocation, player: PlayerId): MoveCoin => ({
  type: MoveType.MoveCoin,
  id,
  target,
  player
})
