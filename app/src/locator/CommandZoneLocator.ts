/** @jsxImportSource @emotion/react */
import { LocationType } from '@gamepark/nidavellir/material/LocationType'
import { MaterialType } from '@gamepark/nidavellir/material/MaterialType'
import { ItemContext, ListLocator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { cardDescription } from '../material/DwarfCardDescription'
import { playerBoardDescription } from '../material/PlayerBoardDescription'
import { CommandZoneDescription } from './CommandZoneDescription'
import { tableLocator } from './TableLocator'

export class CommandZoneLocator extends ListLocator {
  locationDescription = new CommandZoneDescription()

  getLocations({ rules: { players } }: MaterialContext) {
    return players.map((player) => ({ type: LocationType.CommandZone, player }))
  }

  getAreaCoordinates(location: Location, context: MaterialContext) {
    const { x, y } = tableLocator.getCoordinates(location, context)
    const boardLeft = (playerBoardDescription.width / 2) + (this.locationDescription.width / 2)
    return { x: x - boardLeft, y: y + 1.45 }
  }

  getCoordinates(location: Location, context: ItemContext) {
    const { x, y } = this.getAreaCoordinates(location, context)
    const locationTop = this.locationDescription.height / 2
    const cardTop = cardDescription.height / 2
    return { x: x, y: y - locationTop + cardTop + 0.2 + (context.type === MaterialType.Distinction ? 15 : 0) }
  }

  gap = { y: 1.2, z: cardDescription.thickness }
}
