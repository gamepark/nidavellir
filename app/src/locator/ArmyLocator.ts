/** @jsxImportSource @emotion/react */
import { dwarfTypes } from '@gamepark/nidavellir/cards/DwarfType'
import { LocationType } from '@gamepark/nidavellir/material/LocationType'
import { MaterialType } from '@gamepark/nidavellir/material/MaterialType'
import { PlayerId } from '@gamepark/nidavellir/player/Player'
import Army from '@gamepark/nidavellir/rules/helpers/Army'
import { ItemContext, LineLocator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location, MaterialItem } from '@gamepark/rules-api'
import { cardDescription } from '../material/DwarfCardDescription'
import { ArmyLocatorDescription } from './ArmyLocatorDescription'

export class ArmyLocator extends LineLocator<PlayerId, MaterialType, LocationType> {
  locationDescription = new ArmyLocatorDescription()

  getLocations({ rules: { players } }: MaterialContext): Location[] {
    return players.flatMap((player) => dwarfTypes.map((type) => ({ type: LocationType.Army, id: type, player })))
  }

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
