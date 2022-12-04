import GameState from '../GameState';
import { SecretCard } from './SecretCard';
import { SecretCoin } from './SecretCoin';

/**
 * In here, you describe what a GameView will look like at any time during a game.
 * It usually derives from the GameState, because only a few properties change.
 */
type GameView = Omit<GameState, 'cards' | 'coins'> & {
  cards: SecretCard[];
  coins: SecretCoin[];
};

export default GameView;

// FIXME: not really good in term of performance
export const isGameView = (state: GameState | GameView) => state.cards.some((c) => c.id === undefined);
