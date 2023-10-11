/** @jsxImportSource @emotion/react */
import { LocationType } from '@gamepark/nidavellir/material/LocationType'
import { MaterialType } from '@gamepark/nidavellir/material/MaterialType'
import { PlayerId } from '@gamepark/nidavellir/player/Player'
import { ItemContext, LineLocator } from '@gamepark/react-game'
import { Coordinates, MaterialItem } from '@gamepark/rules-api'

export abstract class GridLocator extends LineLocator<PlayerId, MaterialType, LocationType> {
  coordinates = { x: 0, y: 0, z: 0 }
  columns = 2
  abstract itemWidth: number
  abstract itemHeight: number

  getColumns(_item: MaterialItem, _context: ItemContext): number {
    return this.columns
  }

  getPosition(item: MaterialItem, context: ItemContext): Coordinates {
    const coordinates = this.getCoordinates(item, context)
    const index = this.getItemIndex(item, context)
    const columns = this.getColumns(item, context)
    const deltaX = (index % columns) * (this.delta?.x ?? 0) + (item.location.z ?? 0) * (this.delta?.z ?? 0)
    const deltaY = Math.floor(index / columns) * (this.delta?.y ?? 0)

    const x = coordinates.x + ((index % columns) * this.itemWidth) + deltaX
    const y = coordinates.y + (Math.floor(index / columns) * this.itemHeight) + deltaY

    return { x, y, z: coordinates.z }
  }

}
