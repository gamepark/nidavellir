import { MaterialType } from "../../material/MaterialType";
import { LocationType } from "../../material/LocationType";
import { RuleMove, RuleStep } from "@gamepark/rules-api"
import { EffectRule } from "../effect/EffectRule";

export class UlineRules extends EffectRule {
  onRuleStart(_move: RuleMove, _previousRule?: RuleStep) {
    return [
      ...this.hiddenCoins.moveItems({ location: { type: LocationType.PlayerHand, player: this.player } }),
      ...this.end
    ]
  }

  get hiddenCoins() {
    return this.material(MaterialType.Coin)
      .location(LocationType.PlayerBoard)
      .player(this.player)
      .rotation((rotation) => rotation?.y === 1)
  }
}