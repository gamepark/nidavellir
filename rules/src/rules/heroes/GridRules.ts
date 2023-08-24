import { TransformCoinRules } from "../effect/TransformCoinRules";
import { Memory } from "../Memory";

export class GridRules extends TransformCoinRules {
  onRuleStart() {
    this.memorize(Memory.TransformBonus, 7)
    return [];
  }
}