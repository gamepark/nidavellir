import GameState from '../state/GameState';
import GameView from '../state/view/GameView';
import { isInCommandZone } from './location.utils';
import { PlayerId } from '../state/Player';

export const getCardsInCommandZone = (state: GameState | GameView, playerId: PlayerId) => {
  const heroes = state.heroes.filter((c) => isInCommandZone(c.location) && c.location.player === playerId);
  const distinctions = state.distinctions.filter((c) => isInCommandZone(c.location) && c.location.player === playerId);

  return {
    heroes,
    distinctions,
  }
};
