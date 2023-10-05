import { isMoveItem, isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from "@gamepark/rules-api";
import { MaterialType } from "../material/MaterialType";
import { RuleId } from "./RuleId";
import Bid from "./helpers/Bid";
import { Memory } from "./Memory";

class UlineBidRules extends PlayerTurnRule {

  getPlayerMoves(): MaterialMove[] {
    return new Bid(this.game, this.player, true).combinations
      .filter((move) => isMoveItem(move) && move.position.location?.id === this.tavern)
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.Coin)(move)) return []
    return [this.rules().startRule(RuleId.BidRevelation)]
  }

  get tavern() {
    return this.remind(Memory.Tavern)
  }
}

export {UlineBidRules}
