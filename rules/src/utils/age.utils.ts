import GameState from '../state/GameState';
import { LocationType } from '../state/Location';
import GameView from '../state/view/GameView';
import { getCardByTavern } from './tavern.utils';
import { TAVERN_COUNT } from './constants';
import { isInAgeDeck } from './location.utils';
import { getTavernCoins } from './coin.utils';
import groupBy from 'lodash/groupBy';
import { OnPlayerBoard } from '../state/CommonLocations';
import { Coins } from '../coins/Coins';
import pickBy from 'lodash/pickBy';

export const isAge1 = (state: GameState | GameView) =>
  state.cards.some((c) => c.location.type === LocationType.Age1Deck);
export const isAge2 = (state: GameState | GameView) => !isAge1(state);

export const drawTavernCards = (state: GameState) => {
  const game = state as GameState;
  const cardsByTavern = getCardByTavern(game.players);
  const numberOfCard = cardsByTavern * TAVERN_COUNT;
  return game.cards.filter((c) => isInAgeDeck(c.location)).slice(0, numberOfCard);
};

export const getTrades = (state: GameState | GameView) => {
  // Here, the tavern for the gem trade must be the previous one (to get right coins)
  const tavern = state.tavern;
  const tavernCoins = getTavernCoins(state, tavern);

  // Group coins by values (to see tie)
  const coinsByValue = groupBy(tavernCoins, (c) => {
    const player = state.players.find((p) => p.id === (c.location as OnPlayerBoard).player)!;
    const discardedCoin = player?.discarded;
    // It is possible that the coins for the tavern was the transformed value FIXME: move it to getTavernCoins due to transform coin effect
    return Coins[discardedCoin?.index === tavern ? discardedCoin.coin : c.id!].value;
  });

  // Omit coin value with only one coin
  return pickBy(coinsByValue, (c) => c.length > 1);
};
