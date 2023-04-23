import EffectRules from './EffectRules'
import Move from '../moves/Move'
import MoveView from '../moves/MoveView'
import MoveType from '../moves/MoveType'
import { passMove } from '../moves/Pass'
import { getNextIndexByType } from '../utils/player.utils'
import { LocationType } from '../state/Location'
import { Heroes, Thrud } from '../cards/Heroes'
import { MoveHero, moveHeroMove } from '../moves/MoveHero'
import { isInCommandZone } from '../utils/location.utils'
import { DWARF_COLUMNS, onChooseCard } from '../utils/card.utils'
import { EffectType } from './EffectType'
import { triggerDistinctions } from '../utils/distinction.utils'
import { Step } from '../state/GameState'

export type ThrudEffect = {
  type: EffectType.THRUD;
};

class ThrudRules extends EffectRules {
  getPlayerMoves(): (Move | MoveView)[] {
    if (!this.player.ready) {
      const thrud = this.game.heroes.find((c) => Heroes[c.id] === Thrud)!
      if (isInCommandZone(thrud.location)) {
        const nextIndexesByType = getNextIndexByType(this.game, this.player.id)
        return DWARF_COLUMNS.map((type) => {
          return moveHeroMove(thrud.id, {
            type: LocationType.Army,
            player: this.player.id,
            index: nextIndexesByType[type].nextIndex,
            column: type
          }, this.player.id)
        })
      }

      return [passMove(this.player.id)]
    }

    return []
  }

  play(move: Move | MoveView) {
    switch (move.type) {
      case MoveType.MoveHero:
        this.onMoveThrud(move)
        break
      case MoveType.Pass:
        this.player.effects.shift()
        if (this.game.step !== Step.TroopEvaluation) {
          return triggerDistinctions(this.game)
        }
    }

    return []
  }

  onMoveThrud = (move: MoveHero): (Move | MoveView)[] => {
    const moves = onChooseCard(this.game, this.player, move, 'heroes', true)
    if (moves.length) {
      return moves
    }

    return []
  }
}

export { ThrudRules }
