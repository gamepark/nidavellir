import Move from '../moves/Move';
import { NidavellirRules } from './NidavellirRules';
import { Step } from '../state/GameState';
import { TroopEvaluationRules } from './TroopEvaluationRules';
import MoveView from '../moves/MoveView';
import { AgeRules } from './AgeRules';

class Age1Rules extends AgeRules {
  delegate(): NidavellirRules | undefined {
    switch (this.game.step) {
      case Step.TroopEvaluation: {
        return new TroopEvaluationRules(this.game);
      }
    }

    return super.delegate();
  }

  onPass(): (Move | MoveView)[] {
    return [];
  }
}

export { Age1Rules };
