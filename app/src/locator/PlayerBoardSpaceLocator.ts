/** @jsxImportSource @emotion/react */
import { LocationType } from '@gamepark/nidavellir/material/LocationType'
import { MaterialType } from '@gamepark/nidavellir/material/MaterialType'
import { PlayerBoardSpace } from '@gamepark/nidavellir/material/PlayerBoardSpace'
import { PlayerId } from '@gamepark/nidavellir/player/Player'
import { ItemContext, Locator } from '@gamepark/react-game'
import { Location, XYCoordinates } from '@gamepark/rules-api'
import { playerBoardDescription } from '../material/PlayerBoardDescription'
import { PlayerBoardSpaceDescription } from './PlayerBoardSpaceDescription'

export class PlayerBoardSpaceLocator extends Locator<PlayerId, MaterialType, LocationType> {
  parentItemType = MaterialType.PlayerBoard
  locationDescription = new PlayerBoardSpaceDescription()

  spacePosition: Record<PlayerBoardSpace, XYCoordinates> = {
    [PlayerBoardSpace.LaughingGoblin]: { x: 39, y: 18 },
    [PlayerBoardSpace.DancingDragon]: { x: 32.2, y: 41.9 },
    [PlayerBoardSpace.ShiningHorse]: { x: 21.3, y: 64.6 },
    [PlayerBoardSpace.Pouch1]: { x: 9.6, y: 96.3 },
    [PlayerBoardSpace.Pouch2]: { x: 48.9, y: 104.9 },
    [PlayerBoardSpace.Gem]: { x: 39.5, y: -15.1 }
  }

  getPositionOnParent(location: Location) {
    return this.spacePosition[location.id]
  }

  getRotateZ(_location: Location, { type }: ItemContext) {
    return type === MaterialType.Gem ? 180 : 0
  }

  getParentItem(location: Location) {
    return playerBoardDescription.getPlayerBoard(location.player!)
  }
}
