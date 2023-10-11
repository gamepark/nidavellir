/** @jsxImportSource @emotion/react */
import { ItemContext, ItemLocator } from '@gamepark/react-game'
import { MaterialItem } from "@gamepark/rules-api";
import { playerBoardDescription } from "../material/PlayerBoardDescription";
import { cardDescription } from "../material/DwarfCardDescription";

export class TableLocator extends ItemLocator {

  getPosition(item: MaterialItem, context: ItemContext) {
    const { rules } = context
    const index = this.getBoardIndex(item, context)
    if (rules.players.length < 4) {
      return this.getPositionForIndex(index)
    }

    if (rules.players.length === 4) {
      return this.getPositionForIndex([0, 3, 5, 2][index])
    }

    return this.getPositionForIndex([0, 3, 4, 5, 2][index])
  }

  getBoardIndex(item: MaterialItem, { player, rules }: ItemContext) {
    if (!player) return rules.players.indexOf(item.location.player!)
    if (player && player === item.location.player) return 0
    const remainingPlayers = rules.players.filter((p) => p !== player)
    if (remainingPlayers.length === 1) return 2
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
