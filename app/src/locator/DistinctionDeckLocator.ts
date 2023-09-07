/** @jsxImportSource @emotion/react */
import { ItemContext, LineLocator } from '@gamepark/react-game'
import { PlayerId } from '@gamepark/nidavellir/player/Player'
import { MaterialType } from '@gamepark/nidavellir/material/MaterialType'
import { LocationType } from '@gamepark/nidavellir/material/LocationType'
import { cardDescription } from '../material/DwarfCardDescription'
import { Coordinates, MaterialItem } from '@gamepark/rules-api'
import { Distinction } from '@gamepark/nidavellir/material/Distinction'

export class DistinctionDeckLocator extends LineLocator<PlayerId, MaterialType, LocationType> {

  getDelta(item: MaterialItem, context: ItemContext): Partial<Coordinates>{
    const { rules } = context
    const players = rules.players.length
    const y = cardDescription.getSize(item.id).height - (players > 3? 3: 2)
    return { y }
  }

  getCoordinates(_item: MaterialItem<PlayerId, LocationType>, { rules }: ItemContext<PlayerId, MaterialType, LocationType>): Coordinates {
    const players = rules.players.length
    const y = players > 3? -24: -29
    const x = players > 3? 57: 33
    return { x, y, z: 0 }
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
        { ...context, type: MaterialType.Distinction },
      )
    }

    return super.getItemIndex(item, context)
  }
}
