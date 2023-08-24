import { Memory, PreviousRule } from "../Memory";
import { PlayerTurnRule } from "@gamepark/rules-api"

export abstract class EffectRule extends PlayerTurnRule {
  
  get moveToPreviousRule() {
    const previousRule = this.remind<PreviousRule>(Memory.PreviousRule);
    if (!previousRule?.player) return []
    return [this.rules().startPlayerTurn(previousRule.id, this.player)]
  }
}