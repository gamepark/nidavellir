import { MaterialItem, MaterialRulesPart } from '@gamepark/rules-api'
import { MaterialType } from "../../material/MaterialType";
import groupBy from "lodash/groupBy";
import pickBy from "lodash/pickBy";
import { LocationType } from "../../material/LocationType";
import { DiscardedCoin, Memory } from "../Memory";
import { Coins } from "../../coins/Coins";
import isEmpty from "lodash/isEmpty";
import { Gem } from "../../material/Gem";
import { RuleId } from '../RuleId'

export class Trade extends MaterialRulesPart {
  get tavern() {
    return this.remind(Memory.Tavern)
  }

  get tavernCoins(): number[] {
    const tavern = this.tavern

    return this
      .material(MaterialType.Coin)
      .location((location) => location.type === LocationType.PlayerBoard && location.id === tavern)
      .filter((item) => !this.material(MaterialType.Gem).player(item.location.player).id(Gem.Gem6).length)
      .getIndexes()
  }

  get exists(): boolean {
    return !isEmpty(this.trades)
  }

  get trades(): Record<number, number[]>{
    // Here, the tavern for the gem trade must be the previous one (to get right coins)
    const tavernCoins = this.tavernCoins

    // Group coins by values (to see tie)
    const coinsByValue = groupBy(tavernCoins, (index) => {
      const item = this.material(MaterialType.Coin).getItem(index)!
      return this.getCoinValue(item)
    })

    // Omit coin value with only one coin
    return pickBy(coinsByValue, (c) => c.length > 1)
  }

  get goToGemExchangeMoves() {
    return [this.startRule(RuleId.GemTrade)]
  }

  getCoinValue(coin: MaterialItem) {
    const discardedCoin = this.remind<DiscardedCoin>(Memory.DiscardedCoin, coin.location.player)
    if (!discardedCoin || discardedCoin.tavern !== this.tavern) return Coins[coin.id].value
    return Coins[discardedCoin.id].value
  }
}