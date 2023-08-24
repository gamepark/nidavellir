import { Material, MaterialRulesPart } from "@gamepark/rules-api";
import { MaterialType } from "../../material/MaterialType";
import groupBy from "lodash/groupBy";
import pickBy from "lodash/pickBy";
import { LocationType } from "../../material/LocationType";
import { DiscardedCoin, Memory } from "../Memory";
import { Coins } from "../../coins/Coins";
import isEmpty from "lodash/isEmpty";

export class Trade extends MaterialRulesPart {
  get tavern() {
    return this.remind(Memory.Tavern)
  }

  get tavernCoins(): Material {
    const tavern = this.tavern
    const coinIndexes = this
      .material(MaterialType.Coin)
      .location((location) => location.type === LocationType.Tavern && location.x === tavern)
      .getIndexes()
      .map((index) => {
        const item = this.material(MaterialType.Coin).getItem(index)!
        const discardedCoin = this.remind<DiscardedCoin>(Memory.DiscardedCoin, item.location.player)
        if (!discardedCoin) return index

        return discardedCoin.index
      })

    return this.material(MaterialType.Coin).indexes(coinIndexes)
  }

  get exists(): boolean {
    return !isEmpty(this.trades)
  }

  get trades(): Record<number, number[]>{
    // Here, the tavern for the gem trade must be the previous one (to get right coins)
    const tavernCoins = this.tavernCoins.filter((c) => {
      const player = c.location.player!
      return !!this.material(MaterialType.Gem).player(player).length
    })

    // Group coins by values (to see tie)
    const coinsByValue = groupBy(tavernCoins.getIndexes(), this.getCoinValue)

    // Omit coin value with only one coin
    return pickBy(coinsByValue, (c) => c.length > 1)
  }

  getCoinValue (index: number) {
    const item = this.material(MaterialType.Coin).index(index).getItem()!
    return Coins[item.id].value
  }
}