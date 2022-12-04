import { PlayerId } from '../state/Player';
import GameState from '../state/GameState';
import GameView from '../state/view/GameView';
import { isInDiscard, isInTreasure, isOnPlayerBoard } from './location.utils';
import { LocatedCoin } from '../state/LocatedCoin';
import { SecretCoin } from '../state/view/SecretCoin';
import { Coins } from '../coins/Coins';

export const getPlayerCoinForTavern = (
  state: GameState | GameView,
  playerId: PlayerId,
  tavern: number
): LocatedCoin | SecretCoin | undefined => {
  return state.coins.find(
    (c) => isOnPlayerBoard(c.location) && c.location.player === playerId && c.location.index === tavern
  );
};

export const isCoinHidden = (coin: LocatedCoin | SecretCoin): boolean => !!coin.hidden;

export const getPlayerPouch = (state: GameState | GameView, playerId: PlayerId): (LocatedCoin | SecretCoin)[] => {
  return state.coins.filter(
    (c) => isOnPlayerBoard(c.location) && c.location.player === playerId && (c.location.index || 0) > 2
  );
};

/**
 * this function will get a token in the treasure for a given value
 * If there is no value = to this one, return the next higher value
 * If there is no value > this one, return ne previous lower value
 * @param state The game state
 * @param value the coin value
 */
export const getTreasureCoinFromValue = (state: GameState | GameView, value: number) => {
  // TODO: if not available, take coin just superior and if not, take coin just inferior
  return state.coins.find(
    (c: LocatedCoin | SecretCoin) => isInTreasure(c.location) && Coins[(c as LocatedCoin).id].value === value
  ) as LocatedCoin | undefined;
};

/**
 * Get the next index of coin in discard
 * @param state The game state
 */
export const getNextCoinIndexInDiscard = (state: GameState | GameView) =>
  state.coins.filter((c) => isInDiscard(c.location)).length;

/**
 * Get coins for current tavern
 * @param state The game state
 * @param tavern The tavern number
 */
export const getTavernCoins = (state: GameState | GameView, tavern: number) =>
  state.coins.filter((c) => isOnPlayerBoard(c.location) && c.location.index === tavern);
