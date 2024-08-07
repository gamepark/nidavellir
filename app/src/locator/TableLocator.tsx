/** @jsxImportSource @emotion/react */
import { ItemContext, Locator } from '@gamepark/react-game'
import { MaterialItem } from "@gamepark/rules-api";
import { playerBoardDescription } from "../material/PlayerBoardDescription";
import { cardDescription } from "../material/DwarfCardDescription";

export class TableLocator extends Locator {

  getPosition(item: MaterialItem, context: ItemContext) {
    const { rules } = context
    const index = this.getBoardIndex(item, context)
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

  getBoardIndex(item: MaterialItem, { player, rules }: ItemContext) {
    if (!player) return rules.players.indexOf(item.location.player!)
    if (player && player === item.location.player) return 0
    const remainingPlayers = rules.players.filter((p) => p !== player)
    if (remainingPlayers.length === 1) return 1
    return remainingPlayers.indexOf(item.location.player!) + 1
  }

  getPositionForIndex(index: number) {
    const baseX = -66.7
    const rightMargin = 1
    const playerIndex = index
    const cardWidth = cardDescription.width + 0.4
    const playerX = (playerBoardDescription.width + (cardWidth * 6) + rightMargin) * (playerIndex > 2? (playerIndex - 3): playerIndex )
    return { x: baseX + playerX, y: index < 3 ? 21 : -49, z: 0.1 }
  }
}

export const tableLocator = new TableLocator()
