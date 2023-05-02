import { EffectType } from './EffectType'
import EffectRules from './EffectRules'
import Move from '../moves/Move'
import MoveView from '../moves/MoveView'
import MoveType from '../moves/MoveType'
import { getNextIndexByType } from '../utils/player.utils'
import { LocationType } from '../state/Location'
import { Ylud } from '../cards/Heroes'
import { MoveHero, moveHeroMove } from '../moves/MoveHero'
import { isInCommandZone } from '../utils/location.utils'
import { DWARF_COLUMNS, onChooseCard } from '../utils/card.utils'
import { getHero } from '../utils/hero.utils'

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
    }

    return []
  }

  play(move: Move | MoveView) {
    switch (move.type) {
      case MoveType.MoveHero:
        return this.onMoveYlud(move)
    }

    return []
  }

  onMoveYlud = (move: MoveHero): (Move | MoveView)[] => {
    const moves = onChooseCard(this.game, this.player, move, 'heroes', true)
    if (moves.length) {
      return moves
    }

    this.player.effects.shift()
    return []
  }
}

export { YludRules }
