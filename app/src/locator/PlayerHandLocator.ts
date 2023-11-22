import { Coins } from '@gamepark/nidavellir/coins/Coins'
import { LocationType } from '@gamepark/nidavellir/material/LocationType'
import { MaterialType } from '@gamepark/nidavellir/material/MaterialType'
import { PlayerId } from '@gamepark/nidavellir/player/Player'
import { HandLocator, ItemContext } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import orderBy from 'lodash/orderBy'
import { playerBoardDescription } from '../material/PlayerBoardDescription'
import { PlayerHandDescription } from './PlayerHandDescription'
import { tableLocator } from './TableLocator'

export class PlayerHandLocator extends HandLocator<PlayerId, MaterialType, LocationType> {
  locationDescription = new PlayerHandDescription()

  getCoordinates(location: Location<PlayerId, LocationType>, context: ItemContext<PlayerId, MaterialType, LocationType>) {
    const { rules, type } = context
    const playerBoard = playerBoardDescription.getStaticItems(context).find((i) => i.location.player === location.player)!
    const playerBoardPosition = tableLocator.getPosition(playerBoard, {
      ...context, type: MaterialType.PlayerBoard, index: 0, displayIndex: 0
    })
    const playerX = playerBoardPosition.x!
    const playerY = playerBoardPosition.y!
    const alsoCoinInHand = type === MaterialType.Card && !!rules.material(MaterialType.Coin).location(LocationType.Hand).player(location.player).length
    const additionalY = type === MaterialType.Coin ? 12 : 15
    return { x: playerX + 20, y: playerY - additionalY, z: alsoCoinInHand ? 2 : 0 }
  }

  getDeltaZ(_item: MaterialItem<PlayerId, LocationType>, _context: ItemContext<PlayerId, MaterialType, LocationType>): number {
    return super.getDeltaZ(_item, _context)
  }

  getGapMaxAngle(): number {
    return 1.2
  }

  getMaxAngle(): number {
    return 9
  }

  getRadius(): number {
    return 200
  }

  getItemIndex(item: MaterialItem<PlayerId, LocationType>, { player, rules, index, type }: ItemContext<PlayerId, MaterialType, LocationType>): number {
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
