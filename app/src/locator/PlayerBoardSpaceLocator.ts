/** @jsxImportSource @emotion/react */
import { LocationType } from '@gamepark/nidavellir/material/LocationType'
import { MaterialType } from '@gamepark/nidavellir/material/MaterialType'
import { PlayerBoardSpace } from '@gamepark/nidavellir/material/PlayerBoardSpace'
import { PlayerId } from '@gamepark/nidavellir/player/Player'
import { ItemContext, Locator, MaterialContext } from '@gamepark/react-game'
import { Location, MaterialItem, XYCoordinates } from '@gamepark/rules-api'
import { PlayerBoardSpaceLocatorDescription } from './PlayerBoardSpaceLocatorDescription'

export class PlayerBoardSpaceLocator extends Locator<PlayerId, MaterialType, LocationType> {
  parentItemType = MaterialType.PlayerBoard
  locationDescription = new PlayerBoardSpaceLocatorDescription()

  getPosition() {
    return { x: 0, y: 0, z: 1 }
  }

  getPositionOnParent(_location: Location<PlayerId, LocationType>, _context: MaterialContext<PlayerId, MaterialType, LocationType>): XYCoordinates {
    switch (_location.id) {
      case PlayerBoardSpace.LaughingGoblin:
        return { x: 39, y: 18 }
      case PlayerBoardSpace.DancingDragon:
        return { x: 32.2, y: 41.9 }
      case PlayerBoardSpace.ShiningHorse:
        return { x: 21.3, y: 64.6 }
      case PlayerBoardSpace.Pouch1:
        return { x: 9.6, y: 96.3 }
      case PlayerBoardSpace.Pouch2:
        return { x: 48.9, y: 104.9 }
      case PlayerBoardSpace.Gem:
      default:
        return { x: 39.5, y: -15.1 }
    }
  }

  getRotateZ(_item: MaterialItem, { type }: ItemContext): number {
    return type === MaterialType.Gem ? 180 : 0
  }

  getParentItemId(location: Location<PlayerId, LocationType>): number | undefined {
    return location.player
  }
}
