import GameState from '../state/GameState';
import { LocationType } from '../state/Location';
import GameView from '../state/view/GameView';

export const isAge1 = (state: GameState | GameView) =>
  state.cards.some((c) => c.location.type === LocationType.Age1Deck);
export const isAge2 = (state: GameState | GameView) => !isAge1(state);
