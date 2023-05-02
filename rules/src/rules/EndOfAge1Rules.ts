import { NidavellirRules } from './NidavellirRules'
import Move from '../moves/Move'
import MoveView from '../moves/MoveView'
import MoveType from '../moves/MoveType'
import { setStepMove } from '../moves/SetStep'
import { Step } from '../state/GameState'
import { PlayerId } from '../state/Player'
import { getHero, getPlayerWithHero } from '../utils/hero.utils'
import { Ylud } from '../cards/Heroes'
import { isInArmy } from '../utils/location.utils'
import { passMove } from '../moves/Pass'

class EndOfAge1Rules extends NidavellirRules {

  getLegalMoves(_playerId: PlayerId): (Move | MoveView)[] {
    const playerWithYlud = getPlayerWithHero(this.game, Ylud);
    if (playerWithYlud
      && playerWithYlud.id === _playerId
      && isInArmy(getHero(this.game, _playerId, Ylud)!.location)
      && !playerWithYlud.ready) {
      return [passMove(playerWithYlud.id)]
    }

    return []
  }

  play(move: Move | MoveView): (Move | MoveView)[] {
    if (move.type === MoveType.Pass) {
      if (this.game.players.every((p) => p.ready)) {
        return [setStepMove(Step.TroopEvaluation)]
      }
    }

    return []
  }
}

export { EndOfAge1Rules }
