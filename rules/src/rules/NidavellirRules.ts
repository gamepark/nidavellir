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
    return [];
  }

  getAutomaticMoves(): (Move | MoveView)[] {
    return [];
  }

  play(_move: Move | MoveView) {}
}

export { NidavellirRules };
