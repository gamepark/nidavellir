/** @jsxImportSource @emotion/react */
import { MaterialType } from '@gamepark/nidavellir/material/MaterialType'
import { ComponentSize, DropAreaDescription } from '@gamepark/react-game'
import { cardDescription } from '../material/DwarfCardDescription'

export class DiscardLocationDescription extends DropAreaDescription {
  getBorderRadius(id: MaterialType): number {
    return id === MaterialType.Coin ? 4 : 0.5
  }

  getSize(id: MaterialType): ComponentSize {
    if (id === MaterialType.Coin) {
      return { width: 8, height: 8 }
    }
    return { width: cardDescription.width, height: cardDescription.height }
  }
}