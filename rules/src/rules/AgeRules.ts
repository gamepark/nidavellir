import { NidavellirRules } from './NidavellirRules'
import Move from '../moves/Move'
import MoveView from '../moves/MoveView'
import MoveType from '../moves/MoveType'
import { isAge1, isEndOfAge } from '../utils/age.utils'
import { Phase } from '../state/GameState'
import { TurnPreparationRules } from './TurnPreparationRules'
import { TavernResolutionRules } from './TavernResolutionRules'
import { ensureHeroes } from '../utils/hero.utils'

abstract class AgeRules extends NidavellirRules {
  delegate(): NidavellirRules | undefined {
    switch (this.game.phase) {
      case Phase.TurnPreparation:
        return new TurnPreparationRules(this.game)
      case Phase.TavernResolution:
        return new TavernResolutionRules(this.game)
    }
  }

  play(move: Move | MoveView): (Move | MoveView)[] {
    switch (move.type) {
      case MoveType.Pass:
        this.onInnerPass()
        break
    }

    const consequences = super.play(move)

    switch (move.type) {
      case MoveType.Pass:
        consequences.push(...this.onPass(move))
        break
    }

    return consequences
  }

  abstract onPass(move: any): (Move | MoveView)[];

  onInnerPass = () => {
    if (isEndOfAge(this.game)) {
      ensureHeroes(this.game)
    }

    if (isAge1(this.game) && isEndOfAge(this.game) && !this.game.players.some((p) => p.effects.length)) {
      this.game.age = 2
    }
  }
}

export { AgeRules }
