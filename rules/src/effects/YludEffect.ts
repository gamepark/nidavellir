import { EffectType } from './EffectType'
import EffectRules from './EffectRules'
import Move from '../moves/Move'
import MoveView from '../moves/MoveView'
import MoveType from '../moves/MoveType'
import { passMove } from '../moves/Pass'
import { getNextIndexByType } from '../utils/player.utils'
import { LocationType } from '../state/Location'
import { Thrud, Ylud } from '../cards/Heroes'
import { MoveHero, moveHeroMove } from '../moves/MoveHero'
import { isInArmy, isInCommandZone } from '../utils/location.utils'
import { DWARF_COLUMNS, onChooseCard } from '../utils/card.utils'
import { getHero } from '../utils/hero.utils'
import { InArmy } from '../state/LocatedCard'
import { triggerDistinctions } from '../utils/distinction.utils'
import { Step } from '../state/GameState'

export type YludEffect = {
  type: EffectType.YLUD;
};

class YludRules extends EffectRules {
  getPlayerMoves(): (Move | MoveView)[] {
    if (!this.player.ready) {
      const ylud = getHero(this.game, this.player.id, Ylud)!
      if (isInCommandZone(ylud.location)) {
        const nextIndexesByType = getNextIndexByType(this.game, this.player.id)
        return DWARF_COLUMNS.map((type) => {
          return moveHeroMove(ylud.id, {
            type: LocationType.Army,
            player: this.player.id,
            index: nextIndexesByType[type].nextIndex,
            column: type
          }, this.player.id)
        })
      }

      const thrud = getHero(this.game, this.player.id, Thrud)
      if (thrud && (!isInCommandZone(thrud.location) && (!isInArmy(ylud.location) || (thrud.location as InArmy).column !== ylud.location.column))) {
        return [passMove(this.player.id)]
      }
    }

    return []
  }

  play(move: Move | MoveView) {
    switch (move.type) {
      case MoveType.MoveHero:
        return this.onMoveYlud(move)
      case MoveType.Pass:
        this.player.effects.shift()
        if (this.game.step !== Step.TroopEvaluation) {
          return triggerDistinctions(this.game)
        }
    }

    return []
  }

  onMoveYlud = (move: MoveHero): (Move | MoveView)[] => {
    const moves = onChooseCard(this.game, this.player, move, 'heroes', true)
    if (moves.length) {
      return moves
    }

    const thrud = getHero(this.game, this.player.id, Thrud)
    if (thrud && isInCommandZone(thrud.location)) {
      this.player.effects.shift()
    }

    return []
  }
}

export { YludRules }
