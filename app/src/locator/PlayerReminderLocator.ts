import { LocationType } from '@gamepark/nidavellir/material/LocationType'
import { Locator, MaterialContext } from '@gamepark/react-game'
import { Location } from '../../../../rules-api/src'
import { PlayerReminderDescription } from './PlayerReminderDescription'

export class PlayerReminderLocator extends Locator {

  locationDescription = new PlayerReminderDescription()

  getLocations(context: MaterialContext): Location[] {
    return context.rules.players.map((player) => ({
      type: LocationType.PlayerReminder,
      player
    }))
  }
}
