import GameState from '../state/GameState';
import GameView from '../state/view/GameView';
import { MIN_DWARVES_PER_TAVERN, TAVERN_COUNT } from './constants';
import { getCardsInTavern } from './location.utils';
import { InTavern, LocatedCard } from '../state/LocatedCard';
import { isLocatedCard } from './player.utils';

export const getCardByTavern = (state: GameState | GameView) => Math.max(MIN_DWARVES_PER_TAVERN, state.players.length);

export const getCurrentTavern = (state: GameState | GameView): number => {
  const cardInTaverns = getCardsInTavern(state);
  return 3 - Math.floor(cardInTaverns.length / TAVERN_COUNT);
};

export const getCurrentTavernCards = (state: GameState | GameView): LocatedCard[] => {
  const tavern = getCurrentTavern(state);
  return getCardsInTavern(state).filter(
    (c) => isLocatedCard(c) && (c.location as InTavern).tavern === tavern
  ) as LocatedCard[];
};
