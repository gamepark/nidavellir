import GameState from '../state/GameState';
import { LocationType } from '../state/Location';
import GameView from '../state/view/GameView';
import { getCardByTavern } from './tavern.utils';
import { TAVERN_COUNT } from './constants';
import { isInAgeDeck } from './location.utils';

export const isAge1 = (state: GameState | GameView) =>
  state.cards.some((c) => c.location.type === LocationType.Age1Deck);
export const isAge2 = (state: GameState | GameView) => !isAge1(state);

export const drawTavernCards = (state: GameState) => {
  const game = state as GameState;
  const cardsByTavern = getCardByTavern(game);
  const numberOfCard = cardsByTavern * TAVERN_COUNT;
  return game.cards.filter((c) => isInAgeDeck(c.location)).slice(0, numberOfCard);
};
