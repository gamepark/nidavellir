/** @jsxImportSource @emotion/react */
import { ItemContext, PileLocator } from '@gamepark/react-game'
import { PlayerId } from "@gamepark/nidavellir/player/Player";
import { MaterialType } from "@gamepark/nidavellir/material/MaterialType";
import { LocationType } from "@gamepark/nidavellir/material/LocationType";
import { MaterialItem } from "@gamepark/rules-api/dist/material/items/MaterialItem";
import { Coordinates } from "@gamepark/rules-api/dist/material/location/Location";
import { DiscardLocatorDescription } from "./DiscardLocatorDescription";

export class DiscardLocator extends PileLocator<PlayerId, MaterialType, LocationType> {
  locationDescription = new DiscardLocatorDescription()
  limit = 10
  getCoordinates(item: MaterialItem, context: ItemContext): Coordinates {
    const { type, material } = context
    const coordinates = this.locationDescription.getCoordinatesOfType(type, context)
    return { ...coordinates, z: material[type].getThickness(item, context) * (item.location.x! + 1) }
  }

  getRadius(_item: MaterialItem<PlayerId, LocationType>, { type }: ItemContext<PlayerId, MaterialType, LocationType>): number {
    return type === MaterialType.Coin ? 1.7: 0
  }

  getMaxAngle(_item: MaterialItem, { type }: ItemContext): number {
    return type === MaterialType.Card ? 15: 0
  }

  getItemIndex(item: MaterialItem<PlayerId, LocationType>): number {
    return -item.location.x!
  }
}
