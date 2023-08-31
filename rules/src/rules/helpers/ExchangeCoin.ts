import { MaterialType } from "../../material/MaterialType";
import { LocationType } from "../../material/LocationType";
import orderBy from "lodash/orderBy";
import { Coins } from "../../coins/Coins";
import partition from "lodash/partition";
import { Material, MaterialGame, MaterialRulesPart } from "@gamepark/rules-api"
import sumBy from "lodash/sumBy";

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
      [(index) => {
        const item = treasure.getItem(index)!
        return Coins[item.id].value;
      }, (index) => {
        const item = treasure.getItem(index)!
        return item.location.z;
      }],
      ['asc', 'desc']
    )

    const [lowerCoins, higherCoins] = partition(orderedCoins, (index) => {
      const item = treasure.getItem(index)!
      return Coins[item.id].value < value;
    })

    if (higherCoins.length) {
      return treasure.index(higherCoins[0])
    } else {
      return treasure.index(lowerCoins[0])
    }
  }

  get value() {
    return sumBy(this.coins.getItems(), (c) => Coins[c.id].value) + (this.bonus ?? 0)
  }
}