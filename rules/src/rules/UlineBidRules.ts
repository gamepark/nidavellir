import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from "@gamepark/rules-api";
import { MaterialType } from "../material/MaterialType";
import { RuleId } from "./RuleId";
import Bid from "./helpers/Bid";

class UlineBidRules extends PlayerTurnRule {

  getPlayerMoves(): MaterialMove<number, number, number>[] {
    return new Bid(this.game, this.player).combinations
  }

  afterItemMove(move: ItemMove) {
    if (isMoveItemType(MaterialType.Coin)(move)) {
      return [this.rules().startRule(RuleId.BidRevelation)]
    }

    return []
  }
}

export {UlineBidRules}
