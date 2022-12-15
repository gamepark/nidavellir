import Move from './Move';
import GameState from '../state/GameState';
import GameView from '../state/view/GameView';

/**
 * A "MoveView" is the combination of all the types of move views that exists in you game.
 * It usually derives from "Move". You can exclude some Move using: = Exclude<Move, MoveToExclude | OtherMoveToExclude> | MoveToInclude...
 */
type MoveView = Move;

export default MoveView;

export const isView = (state: GameState | GameView): state is GameView =>
  typeof (state as GameView).view !== 'undefined';
