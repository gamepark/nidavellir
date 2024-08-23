import { LocationType } from '@gamepark/nidavellir/material/LocationType'
import { ItemContext, Locator, MaterialContext } from '@gamepark/react-game'
import { Location } from '../../../../rules-api/src'
import { PlayerReminderDescription } from './PlayerReminderDescription'
import { tableLocator } from './TableLocator'

export class PlayerReminderLocator extends Locator {

  locationDescription = new PlayerReminderDescription()

  getLocations(context: MaterialContext) {
    return context.rules.players.map(player => ({ type: LocationType.PlayerReminder, player }))
  }

  getCoordinates(location: Location, context: ItemContext) {
    const { x, y } = tableLocator.getCoordinates(location, context)
    const index = tableLocator.getScreenIndex(location, context)
    return { x: x + 17.7, y: index < 3 ? y - 16.5 : y + 13 }
  }
}
