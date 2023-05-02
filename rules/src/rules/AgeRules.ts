import { NidavellirRules } from './NidavellirRules'
import Move from '../moves/Move'
import MoveView from '../moves/MoveView'
import MoveType from '../moves/MoveType'
import { Phase } from '../state/GameState'
import { TurnPreparationRules } from './TurnPreparationRules'
import { TavernResolutionRules } from './TavernResolutionRules'

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
    const consequences = super.play(move)

    switch (move.type) {
      case MoveType.Pass:
        consequences.push(...this.onPass(move))
        break
    }

    return consequences
  }

  abstract onPass(move: any): (Move | MoveView)[];
}

export { AgeRules }
