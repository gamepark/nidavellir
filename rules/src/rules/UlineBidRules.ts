import { isMoveItemType, ItemMove, MaterialMove, PlayerTurnRule } from '@gamepark/rules-api'
import { MaterialType } from '../material/MaterialType'
import { RuleId } from './RuleId'
import Bid from './helpers/Bid'
import { Memory } from './Memory'
import { LocationType } from '../material/LocationType'

class UlineBidRules extends PlayerTurnRule {

  getPlayerMoves(): MaterialMove[] {
    return new Bid(this.game, this.player, true).combinations
      .filter((move) => {
        if(!isMoveItemType(MaterialType.Coin)(move)) return false
        if (move.location.id !== this.tavern) return false
        const item = this.material(MaterialType.Coin).getItem(move.itemIndex)!
        return item.location.type !== LocationType.PlayerBoard;

      })
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
