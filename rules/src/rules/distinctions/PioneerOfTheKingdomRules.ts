import { DistinctionRules } from "./DistinctionRules";
import { isMoveItemType, ItemMove, MaterialMove, RuleMove } from "@gamepark/rules-api";
import { MaterialType } from "../../material/MaterialType";
import { LocationType } from "../../material/LocationType";
import PlayerTurn from "../helpers/PlayerTurn";


class PioneerOfTheKingdomRules extends DistinctionRules {

  onRuleStart(move: RuleMove): MaterialMove[] {
    const moves = super.onRuleStart(move);

    const player = this.player
    if (!player) {
      moves.push(
        ...this
        .material(MaterialType.Card)
        .location(LocationType.Age2Deck)
        .sort(card => -card.location.x!)
        .limit(1)
        .moveItems({ location: { type: LocationType.Discard } })
      )
    } else {
      // In case player trigger recruitment or royal offering
      if (this.cardsInHand?.length) return []
      moves.push(
        ...this
        .material(MaterialType.Card)
        .location(LocationType.Age2Deck)
        .sort(card => -card.location.x!)
        .limit(3)
        .moveItems({ location: { type: LocationType.PlayerHand, player } })
      )
    }

    return moves;
  }

  getLegalMoves(playerId: number): MaterialMove[] {
    const player = this.player
    if (!player || player !== playerId) return []

    const playerTurn = new PlayerTurn(this.game, player)
    return this
      .material(MaterialType.Card)
      .location(LocationType.PlayerHand)
      .player(player)
      .moveItems((item) => ({ location: playerTurn.getCardLocation(item.id.front) }))
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.Card)(move) || move.position.location?.type === LocationType.PlayerHand) return []
    const player = this.player
    if (!player) return this.endDistinction

    if (move.position.location?.type === LocationType.Army) {
      this.memorizeRule(player)
      const moves = new PlayerTurn(this.game, player).onChooseCard(move)

      if (moves.length) {
        return moves;
      }
    }

    const cardInHands = this.cardsInHand
    if (!cardInHands?.length) return this.endDistinction
    if (cardInHands.length === 2) {
      return [
        ...cardInHands.moveItems({ location: { type: LocationType.Age2Deck } }),
        this.material(MaterialType.Card).location(LocationType.Age2Deck).shuffle()
      ]
    }

    return []
  }
  get cardsInHand() {
    const player = this.player
    if (!player) return
    return this.material(MaterialType.Card).location(LocationType.PlayerHand).player(player)
  }
}

export { PioneerOfTheKingdomRules }
