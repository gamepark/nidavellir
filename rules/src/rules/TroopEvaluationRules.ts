import { NidavellirRules } from './NidavellirRules'
import Move from '../moves/Move'
import MoveType from '../moves/MoveType'
import MoveView from '../moves/MoveView'
import {
  CrownJeweler,
  Distinctions,
  HuntingMaster,
  KingsGreatArmorer,
  PioneerOfTheKingdom
} from '../cards/Distinctions'
import { getPlayerWithMajority } from '../utils/distinction.utils'
import { MoveDistinction, moveDistinctionMove } from '../moves/MoveDistinction'
import { LocationType } from '../state/Location'
import { getCardsInCommandZone, getNextCardIndexInDiscard, onChooseCard } from '../utils/card.utils'
import { isInAge2Deck, isInArmy, isInDistinctionDeck } from '../utils/location.utils'
import { nextTavern } from '../utils/tavern.utils'
import groupBy from 'lodash/groupBy'
import { Player, PlayerId } from '../state/Player'
import { passMove } from '../moves/Pass'
import { HuntingMasterRules } from '../effects/HuntingMaster'
import { KingsGreatArmorerRules } from '../effects/KingsGreatArmorer'
import { CrownJewelerRules } from '../effects/CrownJeweler'
import { MoveCard, moveKnownCardMove } from '../moves/MoveCard'
import { BlacksmithDwarfKingsGreatArmorer, Cards } from '../cards/Cards'
import values from 'lodash/values'
import { LocatedCard } from '../state/LocatedCard'

class TroopEvaluationRules extends NidavellirRules {
  getAutomaticMoves(): (Move | MoveView)[] {
    const wonDistinctions = this.getWonDistinctions()
    if (wonDistinctions.length && this.game.distinctions.filter((d) => isInDistinctionDeck(d.location)).length === Distinctions.length) {
      const distinction = this.game.distinctions.filter((d) => isInDistinctionDeck(d.location))

      const distinctionByPlayers = groupBy(distinction, (d) => {
        const distinction = Distinctions[d.id]
        return getPlayerWithMajority(this.game, distinction.majorityOf)
      })

      const moves = []

      if (!values(distinctionByPlayers).some((cards) => cards.some((c) => Distinctions[c.id] === PioneerOfTheKingdom))) {
        const ageCard = this.game.cards.filter((c) => isInAge2Deck(c.location))[0]!
        moves.push(
          moveKnownCardMove(ageCard.id!, {
            type: LocationType.Discard,
            index: getNextCardIndexInDiscard(this.game)
          })
        )
      }

      moves.push(
        ...this.game.players.flatMap((p) => {
          const wonDistinctions = distinctionByPlayers[p.id] ?? []
          const commandZoneCards = getCardsInCommandZone(this.game, p.id)

          return wonDistinctions.flatMap((d, index) => {
            const moveDistinction = moveDistinctionMove(d.id, {
              type: LocationType.CommandZone,
              player: p.id,
              index: commandZoneCards.heroes.length + commandZoneCards.distinctions.length + index
            }, p.id)

            const distinctionRule = this.getDistinctionRule(d.id, p)

            if (distinctionRule) {
              return [moveDistinction, ...distinctionRule.getAutomaticMoves()]
            }

            return [moveDistinction]
          })
        })
      )

      return moves

    }
    return super.getAutomaticMoves()
  }

  isTurnToPlay(playerId: PlayerId): boolean {
    const player = this.game.players.find((p) => p.id === playerId)!
    return !player.ready
  }

  getLegalMoves(playerId: PlayerId): (Move | MoveView)[] {
    const player = this.game.players.find((p) => p.id === playerId)!
    if (player.ready) {
      return []
    }

    return [passMove(playerId)]
  }

  play(move: Move | MoveView) {
    switch (move.type) {
      case MoveType.MoveDistinction:
        return this.onMoveDistinction(move)
      case MoveType.MoveCard:
        return this.onMoveCard(move)
      case MoveType.Pass:
        if (this.game.players.every((p) => p.ready)) {
          return nextTavern(this.game)
        }
    }

    return []
  }

  private onMoveCard(move: MoveCard): (Move | MoveView)[] {
    const card = Cards[move.id!]
    if (card === BlacksmithDwarfKingsGreatArmorer && isInArmy(move.target)) {
      const player = this.game.players.find((p) => p.id === move.player)!
      onChooseCard(this.game, player, move.id!, 'age')
    }

    return []
  }

  private getWonDistinctions(): LocatedCard[] {
    const distinctions = this.game.distinctions.filter((d) => isInDistinctionDeck(d.location))
    return distinctions.filter((d) => getPlayerWithMajority(this.game, Distinctions[d.id].majorityOf))
  }

  private onMoveDistinction(move: MoveDistinction) {
    const remainingMoves = this.getWonDistinctions()
    const distinction = this.game.distinctions.find((d) => d.id === move.id)!
    const distinctionCard = Distinctions[distinction.id]
    if (distinctionCard.effects) {
      const player = this.game.players.find((p) => p.id === move.player)!
      player.effects.push(...distinctionCard.effects)
      delete player.ready
    }

    if (!remainingMoves.length && this.game.players.every((p) => p.ready)) {
      return nextTavern(this.game)
    }

    return []
  }

  private getDistinctionRule(distinctionId: number, player: Player) {
    const distinction = Distinctions[distinctionId]
    switch (distinction) {
      case KingsGreatArmorer:
        return new KingsGreatArmorerRules(this.game, player)
      case HuntingMaster:
        return new HuntingMasterRules(this.game, player)
      case CrownJeweler:
        return new CrownJewelerRules(this.game, player)
    }

    return null
  }
}

export { TroopEvaluationRules }
