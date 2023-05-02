import { AgeRules } from './AgeRules'
import { isAge2, isEndOfAge } from '../utils/age.utils'
import { setStepMove } from '../moves/SetStep'
import { Step } from '../state/GameState'
import MoveView from '../moves/MoveView'
import Move from '../moves/Move'
import { NidavellirRules } from './NidavellirRules'
import { EndOfAge2Rules } from './EndOfAge2Rules'
import { ensureHeroes, getPlayerWithHero } from '../utils/hero.utils'
import { Thrud, Ylud } from '../cards/Heroes'
import MoveType from '../moves/MoveType'

class Age2Rules extends AgeRules {
  delegate(): NidavellirRules | undefined {
    if (this.game.step === Step.EndOfAge2) {
      return new EndOfAge2Rules(this.game)
    }

    return super.delegate()
  }

  play(move: Move | MoveView): (Move | MoveView)[] {
    if (move.type === MoveType.SetStep && move.step === Step.EndOfAge2) {
      ensureHeroes(this.game)
    }

    return super.play(move)
  }

  onPass(): (Move | MoveView)[] {
    if (!isAge2(this.game) || !isEndOfAge(this.game)) {
      return []
    }

    if (this.game.step !== Step.EndOfAge2) {
      const yludPlayer = getPlayerWithHero(this.game, Ylud)
      const thrudPlayer = getPlayerWithHero(this.game, Thrud)

      if (yludPlayer !== undefined || thrudPlayer !== undefined) {
        return [setStepMove(Step.EndOfAge2)]
      }

      return [setStepMove(Step.Scoring)]
    }
    return []
  }
}

export { Age2Rules }
