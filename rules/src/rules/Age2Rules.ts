import { AgeRules } from './AgeRules'
import { isAge2, isEndOfAge, isEndOfGame } from '../utils/age.utils'
import { setStepMove } from '../moves/SetStep'
import { Step } from '../state/GameState'
import MoveView from '../moves/MoveView'
import Move from '../moves/Move'

class Age2Rules extends AgeRules {

  getAutomaticMoves(): (Move | MoveView)[] {
    if (isAge2(this.game) && isEndOfAge(this.game) && !isEndOfGame(this.game)) {
      return [setStepMove(Step.Scoring)]
    }

    return super.getAutomaticMoves()
  }

  onPass(): (Move | MoveView)[] {
    return []
  }
}

export { Age2Rules }
