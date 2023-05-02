import Move from '../moves/Move'
import { NidavellirRules } from './NidavellirRules'
import { Step } from '../state/GameState'
import MoveView from '../moves/MoveView'
import { AgeRules } from './AgeRules'
import { triggerDistinctions } from '../utils/distinction.utils'
import { isAge1, isEndOfAge } from '../utils/age.utils'
import { EndOfAge1Rules } from './EndOfAge1Rules'
import { setStepMove } from '../moves/SetStep'
import { ensureHeroes, getPlayerWithHero } from '../utils/hero.utils'
import { Thrud, Ylud } from '../cards/Heroes'
import MoveType from '../moves/MoveType'

class Age1Rules extends AgeRules {
  delegate(): NidavellirRules | undefined {
    switch (this.game.step) {
      case Step.EndOfAge1:
        return new EndOfAge1Rules(this.game)
    }

    return super.delegate()
  }

  play(move: Move | MoveView): (Move | MoveView)[] {
    if (move.type === MoveType.SetStep && move.step === Step.EndOfAge1) {
      ensureHeroes(this.game)
    }

    return super.play(move)
  }

  onPass(_move: any): (Move | MoveView)[] {
    if (!isAge1(this.game) || !isEndOfAge(this.game)) {
      return []
    }
    if (this.game.step !== Step.TroopEvaluation) {

      if (this.game.step !== Step.EndOfAge1) {
        const yludPlayer = getPlayerWithHero(this.game, Ylud)
        const thrudPlayer = getPlayerWithHero(this.game, Thrud)

        if (yludPlayer !== undefined || thrudPlayer !== undefined) {
          return [setStepMove(Step.EndOfAge1)]
        }
      }

      return triggerDistinctions(this.game)
    }

    return []
  }
}

export { Age1Rules }
