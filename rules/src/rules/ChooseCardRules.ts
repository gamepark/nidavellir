import { isMoveItemType, ItemMove, PlayerTurnRule } from "@gamepark/rules-api";
import { MaterialType } from "../material/MaterialType";
import { LocationType } from "../material/LocationType";
import { Memory } from "./Memory";
import PlayerTurn from "./helpers/PlayerTurn";

class ChooseCardRules extends PlayerTurnRule {
  getAutomaticMoves() {
    const moves = this.chooseCardMoves
    if (moves.length === 1) {
      return moves
    }

    return [];
  }

  getPlayerMoves() {
    return this.chooseCardMoves;
  }

  get chooseCardMoves() {
    const playerTurn = new PlayerTurn(this.game, this.player)
    const tavern = this.tavern

    const cards = this
      .material(MaterialType.Card)
      .location((location) => location.type === LocationType.Tavern && location.id === tavern);

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
    if (!isMoveItemType(MaterialType.Card)(move)) return []
    // If the card was the last card in tavern for player. ignore it
    return new PlayerTurn(this.game, this.player).onChooseCard(move)
  }

  get tavern() {
    return this.remind(Memory.Tavern)
  }

}

export { ChooseCardRules }
