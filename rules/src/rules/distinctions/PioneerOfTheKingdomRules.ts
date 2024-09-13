import { MaterialMove, RuleMove } from '@gamepark/rules-api'
import { PioneerOfTheKingdom } from '../../cards/Distinctions'
import { LocationType } from '../../material/LocationType'
import { DistinctionRules } from './DistinctionRules'
import { MaterialType } from '../../material/MaterialType'
import PlayerTurn from '../helpers/PlayerTurn'
import { DrawCard, Memory } from '../Memory'
import { RuleId } from '../RuleId'


class PioneerOfTheKingdomRules extends DistinctionRules {

  onRuleStart(move: RuleMove): MaterialMove[] {
    if (this.previousRule && this.previousRule.id === this.ruleId) {
      const moves = super.onRuleStart(move)
      moves.push(...this.endDistinction)
      return moves
    }

    const moves = super.onRuleStart(move)

    const player = this.player
    if (player) {
      this.memorizeRule(player)
      this.memorize<DrawCard>(Memory.DrawCard, { draw: 3, keep: 1, age: 2 })
      moves.push(this.startPlayerTurn(RuleId.DrawCard, player))
      return moves
    }

    moves.push(
      this.ageDeck
        .sort(card => -card.location.x!)
        .moveItem({ type: LocationType.Discard, id: MaterialType.Card }),
    )
    moves.push(...this.endDistinction)

    return moves
  }

  get player() {
    return this.getPlayerWithMajority(PioneerOfTheKingdom.majorityOf)
  }

  getLegalMoves(playerId: number): MaterialMove[] {
    const player = this.player
    if (!player || player !== playerId) return []

    const playerTurn = new PlayerTurn(this.game, player)

    const cards = this
      .material(MaterialType.Card)
      .location(LocationType.Hand)
      .player(player)


    const moves = []
    for (const card of cards.getIndexes()) {
      const locations = playerTurn.getCardLocations(cards.getItem(card)!.id.front)
      moves.push(
        ...locations.map((location) => cards.index(card).moveItem(location))
      )
    }

    return moves
  }

  get cardsInHand() {
    const player = this.player
    if (!player) return
    return this.material(MaterialType.Card).location(LocationType.Hand).player(player)
  }

  get ageDeck() {
    return this
      .material(MaterialType.Card)
      .location(LocationType.Age2Deck)
  }
}

export { PioneerOfTheKingdomRules }
