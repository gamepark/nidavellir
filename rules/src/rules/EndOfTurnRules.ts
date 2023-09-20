import { Location, MaterialMove, PlayerTurnRule, RuleMove, RuleStep } from '@gamepark/rules-api'
import { RuleId } from './RuleId'
import { isExchangeCoin } from '../utils/coin.utils'
import { MaterialType } from '../material/MaterialType'
import { LocationType } from '../material/LocationType'
import { DiscardedCoin, Memory } from './Memory'
import PlayerTurn from './helpers/PlayerTurn'

export class EndOfTurnRules extends PlayerTurnRule {

  getPlayerMoves(): MaterialMove<number, number, number>[] {
    return []
  }

  onRuleStart<RuleId extends number>(_move: RuleMove<number, RuleId>, _previousRule?: RuleStep): MaterialMove<number, number, number>[] {

    const coin = this.tavernCoin
    if (isExchangeCoin(coin)) {
      return [this.rules().startRule(RuleId.TradeCoin)]
    }

    return new PlayerTurn(this.game, this.player).endOfTurnMoves
  }

  get tavernCoin() {
    const tavern = this.tavern
    const coins = this.material(MaterialType.Coin);
    const coin = coins
      .location((location: Location) => location.type === LocationType.PlayerBoard)
      .locationId(tavern)
      .player(this.player)
      .getItem()

    const discardedCoin = this.remind<DiscardedCoin>(Memory.DiscardedCoin, this.player)
    if (!coin && discardedCoin?.tavern === tavern) {
      return coins.index(discardedCoin.index).getItem()!
    }

    return coin!
  }

  get tavern() {
    return this.remind(Memory.Tavern)
  }
}