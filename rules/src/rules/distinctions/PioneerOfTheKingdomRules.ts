import { DistinctionRules } from "./DistinctionRules";
import { isMoveItemType, ItemMove, MaterialMove, RuleMove } from "@gamepark/rules-api";
import { MaterialType } from "../../material/MaterialType";
import { LocationType } from "../../material/LocationType";
import PlayerTurn from "../helpers/PlayerTurn";
import { PioneerOfTheKingdom } from '../../cards/Distinctions'


class PioneerOfTheKingdomRules extends DistinctionRules {

  isTurnToPlay(playerId: number): boolean {
    const player = this.player
    if (!player) return false;
    return playerId === player
  }

  onRuleStart(move: RuleMove): MaterialMove[] {
    const moves = super.onRuleStart(move);

    const player = this.player
    const ageCards = this.ageDeck
      .sort(card => -card.location.x!)
    if (!player) {
      moves.push(
        ...ageCards
          .limit(1)
          .moveItems({ location: { type: LocationType.Discard } })
      )
      moves.push(...this.endDistinction)
    } else {
      // In case player trigger recruitment or royal offering
      if (this.cardsInHand?.length) return []
      moves.push(
        ...ageCards
          .limit(3)
          .moveItems({ location: { type: LocationType.Hand, player } })
      )
    }

    return moves;
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
    if (!player) return this.endDistinction

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
