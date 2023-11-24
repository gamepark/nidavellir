import { ItemLocator } from '@gamepark/react-game'
import { PlayerReminderDescription } from './PlayerReminderDescription'

export class PlayerReminderLocator extends ItemLocator {

  locationDescription = new PlayerReminderDescription()
}
