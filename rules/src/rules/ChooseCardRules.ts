import { isMoveItemType, isStartPlayerTurn, ItemMove, PlayerTurnRule } from "@gamepark/rules-api";
import { MaterialType } from "../material/MaterialType";
import { LocationType } from "../material/LocationType";
import { Memory } from "./Memory";
import ElvalandTurn from "./helpers/ElvalandTurn";
import { CardChoice } from "./helpers/CardChoice";
import { RuleId } from "./RuleId";

class ChooseCardRules extends PlayerTurnRule {
  getAutomaticMoves() {
    const moves = this.chooseCardMoves
    if (moves.length === 1) {
      return [moves[0]]
    }

    return super.getAutomaticMoves();
  }

  getPlayerMoves() {
    return this.chooseCardMoves;
  }

  get chooseCardMoves() {
    const cardChoice = new CardChoice(this.game, this.player)
    const tavern = this.remind(Memory.Tavern)

    return this
      .material(MaterialType.Card)
      .location((location) => location.type === LocationType.Tavern && location.x === tavern)
      .moveItems((item) => ({ location: cardChoice.getLocation(item.id.front)}))
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.Card)(move)) return []

    // TODO: store effect ???
    const cardChoice = new CardChoice(this.game, this.player)
    const moves = cardChoice.onMove(move)
    const otherMoves = []
    const elvalandTurn = new ElvalandTurn(this.game, this.player)

    if (moves.some(((move) => isStartPlayerTurn(move) && move.id === RuleId.RecruitHero))) {
      return moves;
    }

    otherMoves.push(...elvalandTurn.moveToTradeCoin)

    if (!otherMoves.length) {
      otherMoves.push(...elvalandTurn.endOfTurnMoves)
    }

    moves.push(...otherMoves)

    return moves;
  }

  get tavern() {
    return this.remind(Memory.Tavern)
  }


}

export { ChooseCardRules }
