import { RuleMove, RuleStep } from '@gamepark/rules-api'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { EffectRule } from '../effect/EffectRule'

export class UlineRules extends EffectRule {
  onRuleStart(_move: RuleMove, _previousRule?: RuleStep) {
    return [
      ...this.hiddenCoins.moveItems({ type: LocationType.Hand, player: this.player }),
      ...this.end
    ]
  }

  get hiddenCoins() {
    return this.material(MaterialType.Coin)
      .location(location => location.type === LocationType.PlayerBoard && !location.rotation)
      .player(this.player)
  }
}