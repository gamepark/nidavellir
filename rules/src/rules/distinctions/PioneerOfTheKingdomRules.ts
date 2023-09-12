import { DistinctionRules } from "./DistinctionRules";
import { isMoveItemType, ItemMove, MaterialMove, RuleMove, RuleStep } from '@gamepark/rules-api'
import { MaterialType } from "../../material/MaterialType";
import { LocationType } from "../../material/LocationType";
import PlayerTurn from "../helpers/PlayerTurn";
import { PioneerOfTheKingdom } from '../../cards/Distinctions'
import { RuleId } from '../RuleId'
import { DrawCard, Memory } from '../Memory'


class PioneerOfTheKingdomRules extends DistinctionRules {

  onRuleStart(move: RuleMove, previousRule?: RuleStep): MaterialMove[] {
    if (previousRule && !this.distinction) {
      return this.endDistinction
    }

    const moves = super.onRuleStart(move)

    const player = this.player
    if (player) {
      this.memorize<DrawCard>(Memory.DrawCard, { draw: 3, keep: 1, age: 2 })
      return [this.rules().startPlayerTurn(RuleId.ChooseCard, player)]
    }

    const ageCards = this.ageDeck
      .sort(card => -card.location.x!)

    moves.push(
      ...ageCards
        .limit(1)
        .moveItems({ location: { type: LocationType.Discard } }),
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
        ...locations.map((location) => cards.index(card).moveItem({ location }))
      )
    }

    return moves;
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.Card)(move) || move.position.location?.type === LocationType.Hand) return []
    const player = this.player
    if (!player) return []

    const moves = []
    if (move.position.location?.type === LocationType.Army) {
      const cardInHands = this.cardsInHand
      if (!cardInHands?.length) return this.endDistinction
      if (cardInHands.length === 2) {
        moves.push(...cardInHands.moveItems({ location: { type: LocationType.Age2Deck } }))
        moves.push(this.ageDeck.shuffle())
      }

      this.memorizeRule(player)

      const chooseCardMoves = new PlayerTurn(this.game, player).onChooseCard(move)

      if (chooseCardMoves.length) {
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
