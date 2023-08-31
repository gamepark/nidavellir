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
  getCoordinates(item: MaterialItem, { type, material }: ItemContext): Coordinates {
    if (type === MaterialType.Coin) {
      return { x: -73, y: -1, z: material[type].thickness }
    }

    return { x: -73 , y: -11, z: material[type].thickness * (item.location.x! + 1) }
  }

  getRadius(_item: MaterialItem<PlayerId, LocationType>, { type }: ItemContext<PlayerId, MaterialType, LocationType>): number {
    return type === MaterialType.Coin ? 2.5: 0
  }

  getMaxAngle(_item: MaterialItem, { type }: ItemContext): number {
    return type === MaterialType.Card ? 20: 0
  }
}
