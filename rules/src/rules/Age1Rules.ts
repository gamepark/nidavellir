import Move from '../moves/Move';
import { getPhaseRules } from '../utils/rule.utils';
import { NidavellirRules } from './NidavellirRules';
import MoveType from '../moves/MoveType';
import { Step } from '../state/GameState';
import { LocationType } from '../state/Location';
import { TroopEvaluationRules } from './TroopEvaluationRules';
import MoveView from '../moves/MoveView';

class Age1Rules extends NidavellirRules {
  delegate(): NidavellirRules | undefined {
    switch (this.state.steps[0]) {
      case Step.TroopEvaluation:
        return new TroopEvaluationRules(this.state);
    }
    return getPhaseRules(this.state);
  }

  play(move: Move | MoveView) {
    switch (move.type) {
      case MoveType.Pass:
        this.onPass();
        break;
    }

    return super.play(move);
  }

  private onPass() {
    if (this.state.players.some((p) => !p.ready)) {
      return;
    }

    const remainingAge1Cards = this.state.cards.filter((c) => c.location.type === LocationType.Age1Deck).length;
    if (!remainingAge1Cards) {
      this.state.steps = [Step.TroopEvaluation];
    }
  }
}

export { Age1Rules };
