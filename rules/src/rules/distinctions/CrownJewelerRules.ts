import { RuleMove } from '@gamepark/rules-api'
import { Gem } from '../../material/Gem'
import { MaterialType } from '../../material/MaterialType'
import { DistinctionRules } from './DistinctionRules'

class CrownJewelerRules extends DistinctionRules {
  onRuleStart(move: RuleMove) {
    const moves = super.onRuleStart(move)
    const existingGem = this.material(MaterialType.Gem).player(this.player)
    moves.push(
      existingGem.deleteItem(),
      this.material(MaterialType.Gem).id(Gem.Gem6).moveItem(existingGem.getItem()!.location),
      ...this.endDistinction
    )

    return moves
  }
}

export { CrownJewelerRules }
