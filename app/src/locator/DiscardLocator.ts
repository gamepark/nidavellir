/** @jsxImportSource @emotion/react */
import { MaterialType } from '@gamepark/nidavellir/material/MaterialType'
import { ItemContext, LocationContext, PileLocator } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { DiscardLocationDescription } from './DiscardLocationDescription'

export class DiscardLocator extends PileLocator {
  locationDescription = new DiscardLocationDescription()
  limit = 10

  getCoordinates(location: Location, { rules }: ItemContext) {
    if (location.id === MaterialType.Coin) {
      return { x: -74, y: rules.players.length > 3 ? 4 : 0 }
    }
    return { x: -74, y: rules.players.length > 3 ? -5 : -11 }
  }

  placeLocation(location: Location, context: LocationContext) {
    const transform = super.placeLocation(location, context)
    if (!context.canDrop) transform.push('translateZ(10em)')
    return transform
  }

  getRadius(_location: Location, { type }: ItemContext) {
    return type === MaterialType.Coin ? 1.7 : 0
  }

  getMaxAngle(_location: Location, { type }: ItemContext) {
    return type === MaterialType.Card ? 15 : 0
  }
}
