import { NidavellirRules } from './NidavellirRules'
import Move from '../moves/Move'
import MoveView from '../moves/MoveView'
import { setStepMove } from '../moves/SetStep'
import { Step } from '../state/GameState'
import { getHero, getPlayerWithHero } from '../utils/hero.utils'
import { Thrud } from '../cards/Heroes'
import { isInArmy } from '../utils/location.utils'
import { getCardsInCommandZone } from '../utils/card.utils'
import { moveHeroMove } from '../moves/MoveHero'
import { LocationType } from '../state/Location'

class EndOfAge2Rules extends NidavellirRules {

  getAutomaticMoves(): (Move | MoveView)[] {
    const playerWithThrud = getPlayerWithHero(this.game, Thrud)
    if (playerWithThrud !== undefined) {
      const thrud = getHero(this.game, playerWithThrud.id, Thrud)!
      if (isInArmy(thrud.location)) {
        const cardsInCommandZone = getCardsInCommandZone(this.game, playerWithThrud.id)
        let thrudIndex = cardsInCommandZone.heroes.length + cardsInCommandZone.distinctions.length
        return [
          moveHeroMove(thrud.id, {
            type: LocationType.CommandZone,
            player: playerWithThrud.id,
            index: thrudIndex
          }, playerWithThrud.id)
        ]
      }
    }

    if (this.game.players.every((p) => p.ready)) {
      return [setStepMove(Step.Scoring)]
    }

    return []
  }

}

export { EndOfAge2Rules }
