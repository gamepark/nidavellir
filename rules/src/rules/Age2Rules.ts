import { AgeRules } from './AgeRules';
import { isAge2, isEndOfAge } from '../utils/age.utils';
import { setStepMove } from '../moves/SetStep';
import { Step } from '../state/GameState';
import MoveView from '../moves/MoveView';
import Move from '../moves/Move';

class Age2Rules extends AgeRules {
  onPass(): (Move | MoveView)[] {
    console.log('Is end of game ?', isAge2(this.game) && isEndOfAge(this.game));
    if (!isAge2(this.game) || !isEndOfAge(this.game)) {
      return [];
    }

    console.log('Setting scoring phase');
    return [setStepMove(Step.Scoring)];
  }
}

export { Age2Rules };
