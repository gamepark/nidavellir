import { isStartPlayerTurn, RuleMove, RuleStep } from "@gamepark/rules-api";
import { RuleId } from "../RuleId";
import { Memory, PreviousRule } from "../Memory";
import { DistinctionRules } from "./DistinctionRules";

class KingsHandRules extends DistinctionRules {

  onRuleStart(move: RuleMove, previousRules?: RuleStep) {
    if (previousRules?.id === RuleId.TransformCoin) return this.endDistinction

    const moves = super.onRuleStart(move)
    if (!isStartPlayerTurn(move)) return moves

    this.memorize<PreviousRule>(Memory.PreviousRule, { id: move.id, player: move.player })
    this.memorize(Memory.TransformBonus, 5)
    moves.push(this.rules().startPlayerTurn(RuleId.TransformCoin, move.player!))
    return moves
  }
}

export { KingsHandRules }
