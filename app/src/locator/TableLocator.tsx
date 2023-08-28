/** @jsxImportSource @emotion/react */
import { ItemLocator } from '@gamepark/react-game'
import { MaterialItem } from "@gamepark/rules-api";
import { playerBoardDescription } from "../material/PlayerBoardDescription";
import { cardDescription } from "../material/DwarfCardDescription";

export class TableLocator extends ItemLocator {

  getPosition(item: MaterialItem) {
    const baseX = -66.7
    const rightMargin = 1
    const playerIndex = item.location.player! - 1
    const cardWidth = cardDescription.width + 0.4
    const playerX = (playerBoardDescription.width + (cardWidth * 6) + rightMargin) * playerIndex

    return { x: baseX + playerX, y: 21, z: 0.1 }
  }
}
