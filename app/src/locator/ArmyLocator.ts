/** @jsxImportSource @emotion/react */
import { LocationType } from '@gamepark/nidavellir/material/LocationType'
import { MaterialType } from '@gamepark/nidavellir/material/MaterialType'
import { PlayerId } from '@gamepark/nidavellir/player/Player'
import Army from '@gamepark/nidavellir/rules/helpers/Army'
import { ItemContext, LineLocator } from '@gamepark/react-game'
import { Coordinates, MaterialItem } from '@gamepark/rules-api'
import { cardDescription } from '../material/DwarfCardDescription'
import { ArmyLocatorDescription } from './ArmyLocatorDescription'

export class ArmyLocator extends LineLocator<PlayerId, MaterialType, LocationType> {
  locationDescription = new ArmyLocatorDescription()

  getCoordinates(item: MaterialItem<PlayerId, LocationType>, context: ItemContext<PlayerId, MaterialType, LocationType>): Coordinates {
    const locationCoordinates = this.locationDescription.getCoordinates(item.location, context)
    const locationTop = (0.5 * this.locationDescription.height)
    const cardTop = cardDescription.height * 0.5
    const y = 0.2 + locationCoordinates.y - locationTop + cardTop
    return { x: locationCoordinates.x, y, z: 0.05 }
  }

  getDelta() {
    return { y: 1.2, z: cardDescription.thickness }
  }

  getItemIndex(item: MaterialItem<PlayerId, LocationType>, context: ItemContext<PlayerId, MaterialType, LocationType>): number {
    return new Army(context.rules.game, item.location.player!).getGradeIndex(item)
  }
}
