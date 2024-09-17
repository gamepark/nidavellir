import { Coins } from '@gamepark/nidavellir/coins/Coins'
import { LocationType } from '@gamepark/nidavellir/material/LocationType'
import { MaterialType } from '@gamepark/nidavellir/material/MaterialType'
import { DropAreaDescription, HandLocator, ItemContext } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import orderBy from 'lodash/orderBy'
import { coinDescription } from '../material/CoinDescription'
import { tableLocator } from './TableLocator'

export class PlayerHandLocator extends HandLocator {
  locationDescription = new DropAreaDescription({ height: coinDescription.diameter + 1, width: 22, borderRadius: coinDescription.diameter / 2 })
  radius = 200
  maxAngle = 9
  gapMaxAngle = 1.2

  getCoordinates(location: Location, context: ItemContext) {
    const { type, player } = context
    const { x, y } = tableLocator.getCoordinates(location, context)
    const isCard = type === MaterialType.Card && player === location.player
    return { x: x + 20, y: y - (isCard ? 15 : 12), z: isCard ? 5 : 0 }
  }

  getItemIndex(item: MaterialItem, { player, rules, index, type }: ItemContext) {
    if (type === MaterialType.Card) return item.location.x!
    if (item.location.player === player) {
      const coins = rules.material(MaterialType.Coin).location(LocationType.Hand).player(player)
      const sorted = orderBy(coins.getIndexes(), [(c) => Coins[coins.getItem(c)!.id].value, (c) => coins.getItem(c)!.location.x])
      return sorted.indexOf(index)
    } else {
      return item.location.x!
    }
  }
}
