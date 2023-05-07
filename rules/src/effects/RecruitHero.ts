import Move from '../moves/Move'
import MoveType from '../moves/MoveType'
import { getNextIndexByType } from '../utils/player.utils'
import { Heroes, Uline, Ylud } from '../cards/Heroes'
import { LocationType } from '../state/Location'
import { MoveHero, moveHeroMove } from '../moves/MoveHero'
import MoveView from '../moves/MoveView'
import { EffectType } from './EffectType'
import EffectRules from './EffectRules'
import { computeRecruitHeroCount } from '../utils/hero.utils'
import { isInHeroDeck } from '../utils/location.utils'
import { HeroType } from '../cards/Hero'
import { DWARF_COLUMNS, getCardsInCommandZone, onChooseCard } from '../utils/card.utils'
import size from 'lodash/size'
import { UlineRules } from './UlineEffect'

export type RecruitHero = {
  type: EffectType.RECRUIT_HERO;
  count?: number;
};

class RecruitHeroRules extends EffectRules {
  get effect(): RecruitHero {
    return this.player.effects[0] as RecruitHero
  }

  getPlayerMoves(): (Move | MoveView)[] {
    // This computing is here to reduce complexity and prevent computing the next index for each heroes (while there is only 5 types of dwarves vs 20+ hero card)

    const nextIndexesByType = getNextIndexByType(this.game, this.player.id)
    return this.game.heroes
      .filter((h) => {
        const hero = Heroes[h.id]
        return isInHeroDeck(h.location) && (!hero.condition || hero.condition.isActive(this.game, this.player.id))
      })
      .flatMap((h) => {
        const hero = Heroes[h.id]

        if (hero.type === HeroType.Neutral) {
          const cardsInCommandZone = getCardsInCommandZone(this.game, this.player.id)

          // Not so good, but no solution yet
          if (hero !== Ylud) {
            if (size(hero.grades)) {
              const moves = DWARF_COLUMNS.filter((column) => hero.grades?.[column]?.length).flatMap((column) => {
                const nextIndex = nextIndexesByType[column].nextIndex
                return moveHeroMove(h.id, {
                  type: LocationType.Army,
                  player: this.player.id,
                  index: nextIndex,
                  column
                }, this.player.id)
              })

              if (moves.length) {
                return moves
              }
            }
          }

          return moveHeroMove(h.id, {
            type: LocationType.CommandZone,
            player: this.player.id,
            index: cardsInCommandZone.heroes.length + cardsInCommandZone.distinctions.length
          }, this.player.id)
        } else {
          const nextIndex = nextIndexesByType[Heroes[h.id!].type].nextIndex

          return moveHeroMove(h.id, {
            type: LocationType.Army,
            player: this.player.id,
            index: nextIndex,
            column: hero.type
          }, this.player.id)
        }
      })
  }

  play(move: Move | MoveView) {
    switch (move.type) {
      case MoveType.MoveHero:
        return this.onRecruitHero(move)
    }

    return super.play(move)
  }

  onRecruitHero(move: MoveHero): (Move | MoveView)[] {
    const hero = Heroes[move.id]
    const moves = onChooseCard(this.game, this.player, move, 'heroes', false, false)
    if (moves.length) {
      return moves
    }

    const recruitHeroCount = computeRecruitHeroCount(this.game, this.player.id)
    if (!this.effect.count) {
      this.effect.count = recruitHeroCount
    } else {
      this.effect.count += recruitHeroCount - 1
    }

    if (!this.effect.count) {
      this.player.effects.shift()
    }

    if (hero.effects?.length && (hero !== Uline || new UlineRules(this.game, this.player).getAutomaticMoves().length)) {
      this.player.effects.unshift(...JSON.parse(JSON.stringify(hero.effects)))
    }

    return []
  }
}

export { RecruitHeroRules }
