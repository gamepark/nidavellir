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
import { isInAge2Deck, isInArmy, isInDiscard, isInDistinctionDeck } from '../utils/location.utils'
import { nextTavern } from '../utils/tavern.utils'
import { Player, PlayerId } from '../state/Player'
import { HuntingMasterRules } from '../effects/HuntingMaster'
import { KingsGreatArmorerRules } from '../effects/KingsGreatArmorer'
import { CrownJewelerRules } from '../effects/CrownJeweler'
import { MoveCard, moveCardAndRevealMove } from '../moves/MoveCard'
import { BlacksmithDwarfKingsGreatArmorer, Cards } from '../cards/Cards'
import { setStepMove } from '../moves/SetStep'
import { Step } from '../state/GameState'

class TroopEvaluationRules extends NidavellirRules {

  getAutomaticMoves(): (Move | MoveView)[] {

    const currentDistinction = this.game.distinction!

    const distinction = this.game.distinctions[currentDistinction]
    const card = Distinctions[distinction.id]
    const playerWithMajority = getPlayerWithMajority(this.game, card.majorityOf)


    if (!isInDistinctionDeck(distinction.location)) {
      return []
    }
    if (card === PioneerOfTheKingdom && playerWithMajority === undefined) {
      const ageCard = this.game.cards.filter((c) => isInAge2Deck(c.location))[0]!
      return [
        moveCardAndRevealMove(ageCard.id!, {
          type: LocationType.Discard,
          index: getNextCardIndexInDiscard(this.game)
        }),
        setStepMove(Step.TroopEvaluation)
      ]
    }

    if (playerWithMajority === undefined) {
      return [setStepMove(Step.TroopEvaluation)]
    }

    const player = this.game.players.find((p) => p.id === playerWithMajority)!
    const commandZoneCards = getCardsInCommandZone(this.game, playerWithMajority)
    const cardIndex = commandZoneCards.heroes.length + commandZoneCards.distinctions.length
    const moveDistinction = moveDistinctionMove(distinction.id, {
      type: LocationType.CommandZone,
      player: playerWithMajority,
      index: cardIndex
    }, playerWithMajority)

    const distinctionRule = this.getDistinctionRule(distinction.id, player)

    if (distinctionRule) {
      return [moveDistinction, ...distinctionRule.getAutomaticMoves()]
    }

    return [moveDistinction]
  }

  isTurnToPlay(playerId: PlayerId): boolean {
    const player = this.game.players.find((p) => p.id === playerId)!
    return !player.ready
  }

  play(move: Move | MoveView) {
    switch (move.type) {
      case MoveType.MoveDistinction:
        return this.onMoveDistinction(move)
      case MoveType.MoveCard:
        return this.onMoveCard(move)

    }

    return []
  }

  private onMoveCard(move: MoveCard): (Move | MoveView)[] {
    const card = Cards[move.id!]
    if (card === BlacksmithDwarfKingsGreatArmorer && isInArmy(move.target)) {
      const player = this.game.players.find((p) => p.id === move.player)!
      const moves = onChooseCard(this.game, player, move, 'age')
      if (moves.length) {
        return moves
      }
    }

    if (card !== BlacksmithDwarfKingsGreatArmorer
      && this.game.distinction === Distinctions.indexOf(PioneerOfTheKingdom)
      && isInDiscard(move.target)
      && getPlayerWithMajority(this.game, PioneerOfTheKingdom.majorityOf) === undefined) {
      return nextTavern(this.game)
    }

    return []
  }

  private onMoveDistinction(move: MoveDistinction) {
    const distinction = this.game.distinctions.find((d) => d.id === move.id)!
    const card = Distinctions[distinction.id]
    if (card.effects) {
      const player = this.game.players.find((p) => p.id === move.player)!
      player.effects.push(...JSON.parse(JSON.stringify(card.effects)))
      delete player.ready
    }

    if (card === PioneerOfTheKingdom) {
      return nextTavern(this.game)
    }

    return [setStepMove(Step.TroopEvaluation)]
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
