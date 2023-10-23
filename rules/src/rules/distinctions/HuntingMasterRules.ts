import { RuleMove } from '@gamepark/rules-api'
import { Coin } from '../../material/Coin'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { DistinctionRules } from './DistinctionRules'

class HuntingMasterRules extends DistinctionRules {
  onRuleStart(move: RuleMove) {
    const moves = super.onRuleStart(move)
    const existingExchangeCoin = this
      .material(MaterialType.Coin)
      .player(this.player)
      .id((id) => id === Coin.Coin0)

    if (existingExchangeCoin.length) {
      const coin = existingExchangeCoin.getItem()!
      moves.push(
        existingExchangeCoin.moveItem({ type: LocationType.Discard, id: MaterialType.Coin }),
        this.material(MaterialType.Coin).id((id) => id === Coin.HuntingMasterCoin).moveItem(coin.location),
        ...this.endDistinction
      )
    }

    return moves
  }
}

export { HuntingMasterRules }
