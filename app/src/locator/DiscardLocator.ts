/** @jsxImportSource @emotion/react */
import { ItemContext, PileLocator } from '@gamepark/react-game'
import { PlayerId } from "@gamepark/nidavellir/player/Player";
import { MaterialType } from "@gamepark/nidavellir/material/MaterialType";
import { LocationType } from "@gamepark/nidavellir/material/LocationType";
import { MaterialItem } from "@gamepark/rules-api/dist/material/items/MaterialItem";
import { Coordinates } from "@gamepark/rules-api/dist/material/location/Location";

export class DiscardLocator extends PileLocator<PlayerId, MaterialType, LocationType> {
  getCoordinates(_item: MaterialItem, { type }: ItemContext): Coordinates {
    if (type === MaterialType.Coin) {
      return { x: -73, y: -2, z: 0 }
    }

    return { x: -73 , y: -11, z: 0 }
  }

  getRadius(_item: MaterialItem<PlayerId, LocationType>, { type }: ItemContext<PlayerId, MaterialType, LocationType>): number {
    return type === MaterialType.Coin ? 2.5: 0
  }

  getMaxAngle(_item: MaterialItem, { type }: ItemContext): number {
    return type === MaterialType.Card ? 10: 0
  }
}
