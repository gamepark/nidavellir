import { isMoveItemType, ItemMove, MaterialMove, RuleMove } from '@gamepark/rules-api'
import { PioneerOfTheKingdom } from '../../cards/Distinctions'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import PlayerTurn from '../helpers/PlayerTurn'
import { DrawCard, Memory } from '../Memory'
import { RuleId } from '../RuleId'
import { DistinctionRules } from './DistinctionRules'


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
      moves.push(this.rules().startPlayerTurn(RuleId.DrawCard, player))
      return moves
    }

    const ageCards = this.ageDeck
      .sort(card => -card.location.x!)

    moves.push(
      ...ageCards
        .limit(1)
        .moveItems({ type: LocationType.Discard, id: MaterialType.Card })
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

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.Card)(move) || move.location.type === LocationType.Hand) return []
    const player = this.player
    if (!player) return []

    const moves = []
    if (move.location.type === LocationType.Army) {
      const cardInHands = this.cardsInHand
      if (!cardInHands?.length) return this.endDistinction
      if (cardInHands.length === 2) {
        moves.push(...cardInHands.moveItems({ type: LocationType.Age2Deck }))
        moves.push(this.ageDeck.shuffle())
      }

      const chooseCardMoves = new PlayerTurn(this.game, player).onChooseCard(move)

      if (chooseCardMoves.length) {
        this.memorizeRule(player)
        moves.push(...chooseCardMoves)
      }

      moves.push(...this.endDistinction)
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
