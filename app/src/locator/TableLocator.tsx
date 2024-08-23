/** @jsxImportSource @emotion/react */
import { Locator, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { cardDescription } from '../material/DwarfCardDescription'
import { playerBoardDescription } from '../material/PlayerBoardDescription'

export class TableLocator extends Locator {

  getCoordinates(location: Location, context: MaterialContext) {
    return this.getPositionForIndex(this.getScreenIndex(location, context))
  }

  getScreenIndex(location: Location, context: MaterialContext) {
    const index = this.getBoardIndex(location, context)
    switch (context.rules.players.length) {
      case 2:
        return [0, 2][index]
      case 3:
        return index
      case 4:
        return [0, 3, 5, 2][index]
      default:
        return [0, 3, 4, 5, 2][index]
    }
  }

  getBoardIndex(location: Location, { player, rules }: MaterialContext) {
    if (!player) return rules.players.indexOf(location.player!)
    if (player && player === location.player) return 0
    const remainingPlayers = rules.players.filter((p) => p !== player)
    if (remainingPlayers.length === 1) return 1
    return remainingPlayers.indexOf(location.player!) + 1
  }

  getPositionForIndex(index: number) {
    const baseX = -66.7
    const rightMargin = 1
    const playerIndex = index
    const cardWidth = cardDescription.width + 0.4
    const playerX = (playerBoardDescription.width + (cardWidth * 6) + rightMargin) * (playerIndex > 2 ? (playerIndex - 3) : playerIndex)
    return { x: baseX + playerX, y: index < 3 ? 21 : -49, z: 0.1 }
  }
}

export const tableLocator = new TableLocator()
