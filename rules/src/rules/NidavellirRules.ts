import { Rules } from '@gamepark/rules-api';
import GameState from '../state/GameState';
import GameView from '../state/view/GameView';
import Move from '../moves/Move';
import { PlayerId } from '../state/Player';
import MoveView from '../moves/MoveView';

abstract class NidavellirRules extends Rules<GameState | GameView, Move | MoveView, PlayerId> {
  constructor(state: GameState | GameView) {
    super(state);
  }

  getLegalMoves(_playerId: PlayerId): (Move | MoveView)[] {
    return super.getLegalMoves(_playerId);
  }

  getAutomaticMoves(): (Move | MoveView)[] {
    return super.getAutomaticMoves();
  }

  play(move: Move | MoveView): (Move | MoveView)[] {
    return super.play(move);
  }
}

export { NidavellirRules };
