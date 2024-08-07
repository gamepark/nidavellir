/** @jsxImportSource @emotion/react */
import { LocationType } from '@gamepark/nidavellir/material/LocationType'
import { MaterialType } from '@gamepark/nidavellir/material/MaterialType'
import { PlayerId } from '@gamepark/nidavellir/player/Player'
import { ItemContext, LineLocator, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location, MaterialItem } from '@gamepark/rules-api'
import { cardDescription } from '../material/DwarfCardDescription'
import { CommandZoneLocatorDescription } from './CommandZoneLocatorDescription'

export class CommandZoneLocator extends LineLocator<PlayerId, MaterialType, LocationType> {
  locationDescription = new CommandZoneLocatorDescription()

  getLocations({ rules: { players } }: MaterialContext): Location[] {
    return players.map((player) => ({ type: LocationType.CommandZone, player }))
  }

  getCoordinates(item: MaterialItem<PlayerId, LocationType>, context: ItemContext<PlayerId, MaterialType, LocationType>): Coordinates {
    const { type } = context
    const locationCoordinates = this.locationDescription.getCoordinates(item.location, context)
    const locationTop = (0.5 * this.locationDescription.height)
    const cardTop = cardDescription.height * 0.5
    const y = 0.2 + locationCoordinates.y - locationTop + cardTop + (type === MaterialType.Distinction ? 15 : 0)
    return { x: locationCoordinates.x, y, z: 0.05 }
  }

  getDelta() {
    return { y: 1.2, z: cardDescription.thickness }
  }
}
