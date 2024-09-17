/** @jsxImportSource @emotion/react */
import { LocationDescription } from '@gamepark/react-game'
import { PlayerReminder } from './PlayerReminder'

export class PlayerReminderDescription extends LocationDescription {
  width = 25
  height = 4.6
  borderRadius = 1
  content = PlayerReminder
}
