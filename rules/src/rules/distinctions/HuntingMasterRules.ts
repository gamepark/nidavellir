import { LocationType } from '../../material/LocationType'
import { DistinctionRules } from "./DistinctionRules";
import { MaterialType } from "../../material/MaterialType";
import { Coin } from "../../material/Coin";
import { RuleMove } from '@gamepark/rules-api'
import { TroopEvaluation } from "../helpers/TroopEvaluation";

class HuntingMasterRules extends DistinctionRules {
  onRuleStart(move: RuleMove) {
    const moves = super.onRuleStart(move)
    const existingExchangeCoin = this
      .material(MaterialType.Coin)
      .player(this.player)
      .id((id) => id === Coin.Coin0)

    if (existingExchangeCoin.length) {
      const troopEvaluation = new TroopEvaluation(this.game)
      moves.push(
        existingExchangeCoin.moveItem({ location: { type: LocationType.Discard } }),
        this.material(MaterialType.Coin).id((id) => id === Coin.HuntingMasterCoin).moveItem({ location: existingExchangeCoin.getItem()!.location }),
        ...troopEvaluation.endDistinction
      )
    }

    return moves
  }
}

export { HuntingMasterRules }
