import GameState from '../state/GameState';
import GameView from '../state/view/GameView';
import orderBy from 'lodash/orderBy';
import { isOnPlayerBoard } from './location.utils';
import { Coins } from '../coins/Coins';
import { OnPlayerBoard } from '../state/CommonLocations';
import { LocatedCoin } from '../state/LocatedCoin';
import { SecretCoin } from '../state/view/SecretCoin';
import { PlayerId } from '../state/Player';
import { SecretCard } from '../state/view/SecretCard';
import { LocatedCard } from '../state/LocatedCard';
import { getCurrentTavern } from './tavern.utils';
import { getTavernCoins } from './coin.utils';
import { DwarfType } from '../cards/Card';
import { Cards } from '../cards/Cards';
import { Heroes } from '../cards/Heroes';

export const getEvalandTurnOrder = (state: GameState | GameView): PlayerId[] => {
  const tavern = getCurrentTavern(state);
  const coins = getTavernCoins(state, tavern);

  if (coins.some((c) => c.hidden)) {
    throw new Error(`There is some coin for the current tavern ${tavern} that are hidden !`);
  }

  const orderedCoins = orderBy(
    coins,
    (c) => {
      const playerGem = state.gems.find(
        (g) => isOnPlayerBoard(g.location) && g.location.player === (c.location as OnPlayerBoard).player
      )!;
      return [Coins[c.id!].value, playerGem];
    },
    'desc'
  );

  return orderedCoins.map((c) => (c.location as OnPlayerBoard).player);
};

export const getActivePlayer = (state: GameState | GameView) => state.players.find((p) => state.activePlayer === p.id)!;

export const getArmy = (state: GameState | GameView, playerId: PlayerId, type?: DwarfType) => ({
  cards: state.cards.filter(
    (c) => isOnPlayerBoard(c.location) && c.location.player === playerId && (!type || type === Cards[c.id!].type)
  ),
  heroes: state.heroes.filter(
    (c) => isOnPlayerBoard(c.location) && c.location.player === playerId && (!type || type === Heroes[c.id!].type)
  ),
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
