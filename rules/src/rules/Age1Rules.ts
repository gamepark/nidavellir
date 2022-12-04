import Move from '../moves/Move';
import { getPhaseRules } from '../utils/rule.utils';
import { NidavellirRules } from './NidavellirRules';
import { nextPhaseMove } from '../moves/NextPhase';
import MoveType from '../moves/MoveType';
import { Phase, Step } from '../state/GameState';
import { LocationType } from '../state/Location';
import { TroopEvaluationRules } from './TroopEvaluationRules';
import MoveView from '../moves/MoveView';

class Age1Rules extends NidavellirRules {
  delegate(): NidavellirRules {
    switch (this.state.steps[0]) {
      case Step.TroopEvaluation:
        return new TroopEvaluationRules(this.state);
    }
    return getPhaseRules(this.state);
  }

  getAutomaticMoves(): (Move | MoveView)[] {
    if (this.state.players.every((p) => p.ready) && this.state.phase === Phase.TurnPreparation) {
      // si fini, prendre une carte distinction
      // return [distributeDistinctionMove]
      return [nextPhaseMove];
    }

    return super.getAutomaticMoves();
  }

  play(move: Move | MoveView) {
    switch (move.type) {
      case MoveType.NextPhase:
        this.state.phase = Phase.TavernResolution;
        break;
      case MoveType.Pass:
        this.onPass();
        break;
    }

    super.play(move);
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
