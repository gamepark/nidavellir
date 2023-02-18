import { NidavellirRules } from './NidavellirRules';
import Move from '../moves/Move';
import MoveView from '../moves/MoveView';
import { scoringMove } from '../moves/Scoring';
import MoveType from '../moves/MoveType';

class ScoringRules extends NidavellirRules {
  getAutomaticMoves(): (Move | MoveView)[] {
    if (this.game.players.some((p) => p.score === undefined)) {
      return [scoringMove];
    }

    return [];
  }

  play(move: Move | MoveView): (Move | MoveView)[] {
    if (move.type === MoveType.Scoring) {
      this.onScore();
    }

    return [];
  }

  onScore(): void {
    this;
  }

  isOver(): boolean {
    return true;
  }
}

export { ScoringRules };
