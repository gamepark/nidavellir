import { TransformCoinRules } from "../effect/TransformCoinRules";
import { RuleMove, RuleStep} from "@gamepark/rules-api"
import { Memory } from "../Memory";

export class GridRules extends TransformCoinRules {
  onRuleStart(move: RuleMove, previousRule?: RuleStep) {
    this.memorize(Memory.TransformBonus, 7)
    return super.onRuleStart(move, previousRule);
  }
}