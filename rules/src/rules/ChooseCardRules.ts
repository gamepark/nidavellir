import { isMoveItemType, isStartPlayerTurn, ItemMove, MaterialMove, PlayerTurnRule, RuleMove, RuleStep } from "@gamepark/rules-api";
import { MaterialType } from "../material/MaterialType";
import { LocationType } from "../material/LocationType";
import { Memory } from "./Memory";
import ElvalandTurn from "./helpers/ElvalandTurn";
import { CardChoice } from "./helpers/CardChoice";
import { RuleId } from "./RuleId";

class ChooseCardRules extends PlayerTurnRule {

  onRuleStart(_move: RuleMove<number, RuleId>, previousRule?: RuleStep) {
    if (previousRule?.id === RuleId.Thrud) return this.choiceEnded
    return []
  }

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

    if (moves.some((move) => isStartPlayerTurn(move))) {
      return moves;
    }

    moves.push(...this.choiceEnded)

    return moves;
  }

  get tavern() {
    return this.remind(Memory.Tavern)
  }

  get choiceEnded () {
    const elvalandTurn = new ElvalandTurn(this.game, this.player)
    const moves: MaterialMove[] = elvalandTurn.moveToTradeCoin

    if (!moves.length) {
      moves.push(...elvalandTurn.endOfTurnMoves)
    }

    return moves;
  }


}

export { ChooseCardRules }
