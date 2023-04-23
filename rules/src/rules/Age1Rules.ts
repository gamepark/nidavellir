import Move from '../moves/Move'
import { NidavellirRules } from './NidavellirRules'
import { Step } from '../state/GameState'
import { TroopEvaluationRules } from './TroopEvaluationRules'
import MoveView from '../moves/MoveView'
import { AgeRules } from './AgeRules'
import { triggerDistinctions } from '../utils/distinction.utils'
import { isAge1, isEndOfAge } from '../utils/age.utils'

class Age1Rules extends AgeRules {
  delegate(): NidavellirRules | undefined {
    switch (this.game.step) {
      case Step.TroopEvaluation: {
        return new TroopEvaluationRules(this.game)
      }
    }

    return super.delegate()
  }

  onPass(_move: any): (Move | MoveView)[] {
    if (!isAge1(this.game) || !isEndOfAge(this.game)) {
      return []
    }

    return triggerDistinctions(this.game)
  }
}

export { Age1Rules }
