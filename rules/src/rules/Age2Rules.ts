import { AgeRules } from './AgeRules';
import { isEndOfGame } from '../utils/age.utils';
import { setStepMove } from '../moves/SetStep';
import { Step } from '../state/GameState';
import MoveView from '../moves/MoveView';
import Move from '../moves/Move';

class Age2Rules extends AgeRules {
  onPass(): (Move | MoveView)[] {
    if (!isEndOfGame(this.game)) {
      return [];
    }

    return [setStepMove(Step.Scoring)];
  }
}

export { Age2Rules };
