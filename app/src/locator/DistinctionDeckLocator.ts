/** @jsxImportSource @emotion/react */
import { Distinction } from '@gamepark/nidavellir/material/Distinction'
import { MaterialType } from '@gamepark/nidavellir/material/MaterialType'
import { ItemContext, ListLocator } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { cardDescription } from '../material/DwarfCardDescription'

export class DistinctionDeckLocator extends ListLocator {

  getGap(_location: Location, { rules }: ItemContext) {
    const players = rules.players.length
    const y = cardDescription.height - (players > 3 ? 3 : 2)
    return { y }
  }

  getCoordinates(_location: Location, { rules }: ItemContext) {
    const players = rules.players.length
    const y = players > 3 ? -24 : -29
    const x = players > 3 ? 57 : 33
    return { x, y }
  }

  getItemIndex(item: MaterialItem, context: ItemContext): number {
    const { type, rules } = context
    if (type === MaterialType.Gem) {
      return this.getItemIndex(
        rules.material(MaterialType.Distinction).id(Distinction.CrownJeweler).getItem()!,
        { ...context, type: MaterialType.Distinction }
      )
    }

    if (type === MaterialType.Card) {
      return this.getItemIndex(
        rules.material(MaterialType.Distinction).id(Distinction.KingsGreatArmorer).getItem()!,
        { ...context, type: MaterialType.Distinction }
      )
    }

    if (type === MaterialType.Coin) {
      return this.getItemIndex(
        rules.material(MaterialType.Distinction).id(Distinction.HuntingMaster).getItem()!,
        { ...context, type: MaterialType.Distinction }
      )
    }

    return super.getItemIndex(item, context)
  }
}
