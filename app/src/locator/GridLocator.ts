/** @jsxImportSource @emotion/react */
import { ItemContext, LineLocator } from '@gamepark/react-game'
import { PlayerId } from "@gamepark/nidavellir/player/Player";
import { MaterialType } from "@gamepark/nidavellir/material/MaterialType";
import { LocationType } from "@gamepark/nidavellir/material/LocationType";
import { Coordinates, MaterialItem } from "@gamepark/rules-api";

export class GridLocator extends LineLocator<PlayerId, MaterialType, LocationType> {
  coordinates = { x: 0, y: 0, z: 0 }
  columns = 2

  getPosition(item: MaterialItem, context: ItemContext): Coordinates {
    const coordinates = this.getCoordinates(item, context)
    const index = this.getItemIndex(item, context)
    const deltaX = (index % this.columns) * (this.delta?.x ?? 0) + (item.location.z ?? 0) * (this.delta?.z ?? 0)
    const deltaY = Math.floor(index / this.columns) * (this.delta?.y ?? 0)

    const x = coordinates.x + ((index % this.columns) * context.material[context.type].getSize(item.id).width) + deltaX
    const y = coordinates.y + (Math.floor(index / this.columns) * context.material[context.type].getSize(item.id).height) + deltaY

    return { x, y, z: 0 }
  }
}
