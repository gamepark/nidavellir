import { Rules } from '@gamepark/rules-api';
import GameState from '../state/GameState';
import GameView from '../state/view/GameView';
import Move from '../moves/Move';
import { PlayerId } from '../state/Player';

abstract class NidavellirRules extends Rules<GameState | GameView, Move, number> {
  constructor(state: GameState | GameView) {
    super(state);
  }

  getLegalMoves(_playerId: PlayerId): Move[] {
    return [];
  }

  getAutomaticMoves(): Move[] {
    return [];
  }

  play(_move: Move) {}
}

export { NidavellirRules };
