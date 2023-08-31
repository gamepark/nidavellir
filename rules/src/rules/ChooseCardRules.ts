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

    return this
      .material(MaterialType.Card)
      .location((location) => location.type === LocationType.Tavern && location.id === tavern)
      .moveItems((item) => ({ location: playerTurn.getCardLocation(item.id.front)}))
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.Card)(move)) return []

    //console.log(move, this.tavern)
    return new PlayerTurn(this.game, this.player).onChooseCard(move)
  }

  get tavern() {
    return this.remind(Memory.Tavern)
  }

}

export { ChooseCardRules }
