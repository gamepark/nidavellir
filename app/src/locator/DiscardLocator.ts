/** @jsxImportSource @emotion/react */
import { LocationType } from '@gamepark/nidavellir/material/LocationType'
import { MaterialType } from '@gamepark/nidavellir/material/MaterialType'
import { PlayerId } from '@gamepark/nidavellir/player/Player'
import { ItemContext, PileLocator } from '@gamepark/react-game'
import { Coordinates, MaterialItem } from '@gamepark/rules-api'
import { cardDescription } from '../material/DwarfCardDescription'
import { DiscardLocatorDescription } from './DiscardLocatorDescription'

export class DiscardLocator extends PileLocator<PlayerId, MaterialType, LocationType> {
  locationDescription = new DiscardLocatorDescription()
  locations = [{ type: LocationType.Discard, id: MaterialType.Coin }, { type: LocationType.Discard, id: MaterialType.Card }]
  limit = 10

  getCoordinates(item: MaterialItem, context: ItemContext): Coordinates {
    const { type } = context
    const coordinates = this.locationDescription.getCoordinatesOfType(type, context)
    return { ...coordinates, z: cardDescription.thickness * (item.location.x! + 1) }
  }

  getRadius(_item: MaterialItem<PlayerId, LocationType>, { type }: ItemContext<PlayerId, MaterialType, LocationType>): number {
    return type === MaterialType.Coin ? 1.7 : 0
  }

  getMaxAngle(_item: MaterialItem, { type }: ItemContext): number {
    return type === MaterialType.Card ? 15 : 0
  }

  getItemIndex(item: MaterialItem<PlayerId, LocationType>): number {
    return -item.location.x!
  }
}
