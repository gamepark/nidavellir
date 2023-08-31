import { Material, MaterialRulesPart } from "@gamepark/rules-api";
import { MaterialType } from "../../material/MaterialType";
import groupBy from "lodash/groupBy";
import pickBy from "lodash/pickBy";
import { LocationType } from "../../material/LocationType";
import { DiscardedCoin, Memory } from "../Memory";
import { Coins } from "../../coins/Coins";
import isEmpty from "lodash/isEmpty";
import { Gem } from "../../material/Gem";

export class Trade extends MaterialRulesPart {
  get tavern() {
    return this.remind(Memory.Tavern)
  }

  get tavernCoins(): Material {
    const tavern = this.tavern
    const coinIndexes = this
      .material(MaterialType.Coin)
      .location((location) => location.type === LocationType.PlayerBoard && location.id === tavern)
      .filter((item) => {
        const gem = this.material(MaterialType.Gem).player(item.location.player)
        return !gem.length || gem.getItem()!.id !== Gem.Gem6;
      })
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
    const tavernCoins = this.tavernCoins

    // Group coins by values (to see tie)
    const coinsByValue = groupBy(tavernCoins.getIndexes(), (c) => this.getCoinValue(c))

    // Omit coin value with only one coin
    return pickBy(coinsByValue, (c) => c.length > 1)
  }

  getCoinValue (index: number) {
    const item = this.material(MaterialType.Coin).index(index).getItem()!
    return Coins[item.id].value
  }
}