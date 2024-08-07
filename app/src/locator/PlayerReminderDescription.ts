/** @jsxImportSource @emotion/react */
import { PlayerBoardSpace } from '@gamepark/nidavellir/material/PlayerBoardSpace'
import { ItemContext, LocationDescription } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import Images from '../images/Images'
import { cardDescription } from '../material/DwarfCardDescription'
import { playerBoardDescription } from '../material/PlayerBoardDescription'
import { PlayerReminder } from './PlayerReminder'

export class PlayerReminderDescription extends LocationDescription {
  width = 25
  height = 4.6
  borderRadius = 1
  alwaysVisible = true

  getCoordinates(location: Location, context: ItemContext) {
    const { rules } = context
    const index = this.getBoardIndex(location, context)
    switch (rules.players.length) {
      case 2:
        return this.getPositionForIndex([0, 2][index])
      case 3:
        return this.getPositionForIndex(index)
      case 4:
        return this.getPositionForIndex([0, 3, 5, 2][index])
      default:
        return this.getPositionForIndex([0, 3, 4, 5, 2][index])
    }
  }


  getBoardIndex(location: Location, { player, rules }: ItemContext) {
    if (!player) return rules.players.indexOf(location.player!)
    if (player && player === location.player) return 0
    const remainingPlayers = rules.players.filter((p) => p !== player)
    if (remainingPlayers.length === 1) return 1
    return remainingPlayers.indexOf(location.player!) + 1
  }

  getPositionForIndex(index: number) {
    const baseX = -49
    const rightMargin = 1
    const playerIndex = index
    const cardWidth = cardDescription.width + 0.4
    const playerX = (playerBoardDescription.width + (cardWidth * 6) + rightMargin) * (playerIndex > 2? (playerIndex - 3): playerIndex )
    return { x: baseX + playerX, y: index < 3 ? 4.5 : -36, z: 0.1 }
  }

  content = PlayerReminder

  getHelpImage(location: Location) {
    switch (location.id) {
      case PlayerBoardSpace.LaughingGoblin:
        return Images.LaughingGoblin
      case PlayerBoardSpace.DancingDragon:
        return Images.DancingDragon
      case PlayerBoardSpace.ShiningHorse:
        return Images.ShiningHorse
      default:
        return Images.PouchIcon
    }
  }
}
