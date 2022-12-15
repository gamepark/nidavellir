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
  view: boolean;
  playerId?: number;
};

export default GameView;
