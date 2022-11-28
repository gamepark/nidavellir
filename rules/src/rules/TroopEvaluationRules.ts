import { NidavellirRules } from './NidavellirRules';
import Move from '../moves/Move';
import MoveType from '../moves/MoveType';
import { Step } from '../state/GameState';
import { evaluateTroopsMove } from '../moves/EvaluateTroop';

class TroopEvaluationRules extends NidavellirRules {
  getAutomaticMoves(): Move[] {
    switch (this.state.steps[0]) {
      case Step.TroopEvaluation:
        return [evaluateTroopsMove];
    }

    return [];
  }

  play(move: Move) {
    switch (move.type) {
      case MoveType.EvaluateTroops:
        this.onEvaluateTroops();
        break;
    }
  }

  private onEvaluateTroops() {}
}

export { TroopEvaluationRules };
