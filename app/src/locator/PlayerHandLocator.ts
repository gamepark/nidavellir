import { HandLocator, ItemContext } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { PlayerId } from "@gamepark/nidavellir/player/Player";
import { LocationType } from "@gamepark/nidavellir/material/LocationType";
import { MaterialType } from "@gamepark/nidavellir/material/MaterialType";
import { playerBoardDescription } from "../material/PlayerBoardDescription";
import { cardDescription } from "../material/DwarfCardDescription";
import { Coins } from "@gamepark/nidavellir/coins/Coins";
import orderBy from 'lodash/orderBy'

export class PlayerHandLocator extends HandLocator<PlayerId, MaterialType, LocationType> {
  isHidden(item: MaterialItem<PlayerId, LocationType>, { type, player }: ItemContext<PlayerId, MaterialType, LocationType>): boolean {
    return item.location.player !== player && (type === MaterialType.Card || !item.rotation?.y)
  }

  getCoordinates(location: Location<PlayerId, LocationType>, { type, index, rules }: ItemContext<PlayerId, MaterialType, LocationType>) {
    const baseX = -46
    const rightMargin = 1
    const playerIndex = (location.player! - 1)
    const cardWidth = cardDescription.width + 0.4
    const playerX = (playerBoardDescription.width + (cardWidth * 6) + rightMargin) * playerIndex
    const y = type === MaterialType.Coin? (8 - ((rules.material(type).getItem(index)!.rotation?.y ?? 0) * 2)): 6
    return { x: baseX + playerX, y, z: 0 }
  }

  getDeltaZ(_item: MaterialItem<PlayerId, LocationType>, _context: ItemContext<PlayerId, MaterialType, LocationType>): number {
    return super.getDeltaZ(_item, _context);
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

  getItemIndex(item: MaterialItem<PlayerId, LocationType>, { player, rules, index }: ItemContext<PlayerId, MaterialType, LocationType>): number {
    if (item.location.player === player) {
      const coins = rules.material(MaterialType.Coin).location(LocationType.Hand).player(player)
      const sorted = orderBy(coins.getIndexes(), [(c) => Coins[coins.getItem(c)!.id].value, (c) => coins.getItem(c)!.location.x ])
      return sorted.indexOf(index)
    } else {
      return item.location.x!
    }
  }
}
