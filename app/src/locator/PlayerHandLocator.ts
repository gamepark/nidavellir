import { HandLocator, ItemContext } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { PlayerId } from "@gamepark/nidavellir/player/Player";
import { LocationType } from "@gamepark/nidavellir/material/LocationType";
import { MaterialType } from "@gamepark/nidavellir/material/MaterialType";
import { playerBoardDescription } from "../material/PlayerBoardDescription";
import { cardDescription } from "../material/DwarfCardDescription";

export class PlayerHandLocator extends HandLocator<PlayerId, MaterialType, LocationType> {
  isHidden(item: MaterialItem<PlayerId, LocationType>, context: ItemContext<PlayerId, MaterialType, LocationType>): boolean {
    return item.location.player !== context.player
  }

  getCoordinates(location: Location<PlayerId, LocationType>, _context: ItemContext<PlayerId, MaterialType, LocationType>) {

    const baseX = -46
    const rightMargin = 1
    const playerIndex = (location.player! - 1)
    const cardWidth = cardDescription.width + 0.4
    const playerX = (playerBoardDescription.width + (cardWidth * 6) + rightMargin) * playerIndex
    return { x: baseX + playerX, y: 8, z: 0 }
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
}
