/** @jsxImportSource @emotion/react */
import { dwarfTypes } from '@gamepark/nidavellir/cards/DwarfType'
import { LocationType } from '@gamepark/nidavellir/material/LocationType'
import Army from '@gamepark/nidavellir/rules/helpers/Army'
import { ItemContext, ListLocator, MaterialContext } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { cardDescription } from '../material/DwarfCardDescription'
import { playerBoardDescription } from '../material/PlayerBoardDescription'
import { ArmyLocatorDescription } from './ArmyLocatorDescription'
import { tableLocator } from './TableLocator'

export class ArmyLocator extends ListLocator {
  locationDescription = new ArmyLocatorDescription()

  getLocations({ rules: { players } }: MaterialContext): Location[] {
    return players.flatMap(player => dwarfTypes.map(type => ({ type: LocationType.Army, id: type, player })))
  }

  getAreaCoordinates(location: Location, context: MaterialContext) {
    const { x, y } = tableLocator.getCoordinates(location, context)
    const boardLeft = (playerBoardDescription.width / 2) + (this.locationDescription.width / 2)
    const locationLeft = boardLeft + (location.id! - 1) * this.locationDescription.width
    return { x: x + locationLeft, y: y + 1.77 }
  }

  getCoordinates(location: Location, context: MaterialContext) {
    const { x, y } = this.getAreaCoordinates(location, context)
    const locationTop = this.locationDescription.height / 2
    const cardTop = cardDescription.height / 2
    return { x, y: y - locationTop + cardTop + 0.2 }
  }

  gap = { y: 1.2, z: cardDescription.thickness }

  getItemIndex(item: MaterialItem, context: ItemContext) {
    return new Army(context.rules.game, item.location.player!).getGradeIndex(item)
  }
}
