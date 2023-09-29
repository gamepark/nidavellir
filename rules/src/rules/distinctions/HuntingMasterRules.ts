import { LocationType } from '../../material/LocationType'
import { DistinctionRules } from './DistinctionRules'
import { MaterialType } from '../../material/MaterialType'
import { Coin } from '../../material/Coin'
import { RuleMove } from '@gamepark/rules-api'

class HuntingMasterRules extends DistinctionRules {
  onRuleStart(move: RuleMove) {
    const moves = super.onRuleStart(move)
    const existingExchangeCoin = this
      .material(MaterialType.Coin)
      .player(this.player)
      .id((id) => id === Coin.Coin0)

    if (existingExchangeCoin.length) {
      const coin = existingExchangeCoin.getItem()!
      const position = {
        location: coin.location,
        rotation: coin.rotation
      }
      moves.push(
        existingExchangeCoin.moveItem({ location: { type: LocationType.Discard, id: MaterialType.Coin } }),
        this.material(MaterialType.Coin).id((id) => id === Coin.HuntingMasterCoin).moveItem(position),
        ...this.endDistinction
      )
    }

    return moves
  }
}

export { HuntingMasterRules }
