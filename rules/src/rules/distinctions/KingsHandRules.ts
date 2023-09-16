import { isStartPlayerTurn, RuleMove, RuleStep } from "@gamepark/rules-api";
import { RuleId } from "../RuleId";
import { Memory } from "../Memory";
import { DistinctionRules } from "./DistinctionRules";

class KingsHandRules extends DistinctionRules {

  onRuleStart(move: RuleMove, previousRules?: RuleStep) {
    const consequences = super.onRuleStart(move)
    if (previousRules?.id === RuleId.TransformCoin) {
      consequences.push(...this.endDistinction)
      return consequences
    }

    const moves = super.onRuleStart(move)
    if (!isStartPlayerTurn(move)) return moves
    this.memorizeRule(move.player!)
    this.memorize(Memory.TransformBonus, 5)
    moves.push(this.rules().startPlayerTurn(RuleId.TransformCoin, move.player!))
    return moves
  }
}

export { KingsHandRules }
