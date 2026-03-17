import { MaterialType } from "../../material/MaterialType";
import { LocationType } from "../../material/LocationType";
import { partition } from 'es-toolkit'
import { orderBy, sumBy } from 'es-toolkit/compat'
import { Coins } from "../../coins/Coins";
import { Coin } from "../../material/Coin";
import { Material, MaterialGame, MaterialRulesPart } from "@gamepark/rules-api"

export class ExchangeCoin extends MaterialRulesPart {

    constructor(game: MaterialGame, readonly coins: Material, readonly bonus?: number) {
    super(game);
  }

  // TODO: work to simplify it
  get treasureCoin()  {
    const value = this.value
    const treasure = this.material(MaterialType.Coin).location(LocationType.Treasure)

    const orderedCoins = orderBy(
      treasure.getIndexes(),
      [(index: number) => {
        const item = treasure.getItem(index)
        return Coins[item.id as Coin].value;
      }, (index: number) => {
        const item = treasure.getItem(index)
        return item.location.z;
      }],
      ['asc', 'desc']
    )

    const [lowerCoins, higherCoins] = partition(orderedCoins, (index) => {
      const item = treasure.getItem(index)
      return Coins[item.id as Coin].value < value;
    })

    if (higherCoins.length) {
      return treasure.index(higherCoins[0])
    } else {
      return treasure.index(lowerCoins[lowerCoins.length - 1])
    }
  }

  get value() {
    return sumBy(this.coins.getItems(), (c) => Coins[c.id as Coin].value) + (this.bonus ?? 0)
  }
}