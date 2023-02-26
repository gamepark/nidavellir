import { NidavellirRules } from './NidavellirRules';
import Move from '../moves/Move';
import MoveView from '../moves/MoveView';
import { scoringMove } from '../moves/Scoring';
import MoveType from '../moves/MoveType';
import { getPlayerScore } from '../utils/score.utils';
import { revealCoinMove } from '../moves/MoveCoin';

class ScoringRules extends NidavellirRules {
  getAutomaticMoves(): (Move | MoveView)[] {
    if (this.game.players.some((p) => p.score === undefined)) {
      return [...this.game.coins.filter((c) => c.hidden).map((c) => revealCoinMove(c.id!)), scoringMove];
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
    this.game.players.forEach((p) => {
      p.score = getPlayerScore(this.game, p.id);
    });
  }

  isOver(): boolean {
    return true;
  }
}

export { ScoringRules };
