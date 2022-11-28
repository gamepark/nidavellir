import GameState from '../state/GameState';
import GameView from '../state/view/GameView';
import max from 'lodash/max';
import orderBy from 'lodash/orderBy';
import { isOnPlayerBoard } from './location.utils';
import { Coins } from '../coins/Coins';
import { OnPlayerBoard } from '../state/CommonLocations';
import { LocatedCoin } from '../state/LocatedCoin';
import { SecretCoin } from '../state/view/SecretCoin';
import { PlayerId } from '../state/Player';
import { SecretCard } from '../state/view/SecretCard';
import { LocatedCard } from '../state/LocatedCard';

export const getEvalandTurnOrder = (state: GameState | GameView): PlayerId[] => {
  // Take revealed coins on the maximum position (the last returned)
  const revealedCoins: [LocatedCoin | SecretCoin, OnPlayerBoard][] = state.coins
    .filter((coin) => isOnPlayerBoard(coin.location) && !coin.hidden)
    .map((coin) => [coin, coin.location as OnPlayerBoard]);

  const maxPosition = max(revealedCoins.map(([, location]) => location.index));

  if (maxPosition === undefined) {
    console.error('There is something that does not work well here. There must be revealed coins');
    return [];
  }

  return orderBy(
    revealedCoins.filter(([, location]) => location.index === maxPosition),
    ([coin]) => Coins[coin.id!].value,
    'desc'
  ).map(([, location]) => location.player);
};

export const getActivePlayer = (state: GameState | GameView) => state.players.find((p) => state.activePlayer === p.id)!;

export const getArmy = (state: GameState | GameView, playerId: PlayerId) => ({
  cards: state.cards.filter((c) => isOnPlayerBoard(c.location) && c.location.player === playerId),
  heroes: state.heroes.filter((c) => isOnPlayerBoard(c.location) && c.location.player === playerId),
});

export const isLocatedCard = (c: SecretCard | LocatedCard): c is LocatedCard => c.id !== undefined;
export const isLocatedCoin = (c: SecretCoin | LocatedCard | undefined): c is LocatedCoin => c?.id !== undefined;

export const getNextPlayer = (state: GameState | GameView) => {
  const turnOrder = getEvalandTurnOrder(state);

  if (state.activePlayer === turnOrder[turnOrder.length - 1]) {
    return turnOrder[0];
  }

  const activePlayerIndex = turnOrder.findIndex((id) => state.activePlayer === id);
  return turnOrder[activePlayerIndex + 1];
};
