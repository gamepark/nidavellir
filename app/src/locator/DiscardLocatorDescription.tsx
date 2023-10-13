/** @jsxImportSource @emotion/react */
import { LocationType } from '@gamepark/nidavellir/material/LocationType'
import { ComponentSize, LocationDescription, MaterialContext } from '@gamepark/react-game'
import { cardDescription } from '../material/DwarfCardDescription'
import { Location } from '@gamepark/rules-api'
import { MaterialType } from '@gamepark/nidavellir/material/MaterialType'

export class DiscardLocatorDescription extends LocationDescription {
  alwaysVisible = false

  locations = [{ type: LocationType.Discard, id: MaterialType.Coin }, { type: LocationType.Discard, id: MaterialType.Card }]

  getSize(location: Location): ComponentSize {
    if (location.id === MaterialType.Coin) {
      return { width: 8, height: 8 }
    }
    return { width: cardDescription.width, height: cardDescription.width / cardDescription.ratio }
  }

  getCoordinates(location: Location, context: MaterialContext) {
    return this.getCoordinatesOfType(location.id, context)
  }

  getCoordinatesOfType(type: MaterialType, { rules }: MaterialContext) {
    if (type === MaterialType.Coin) {
      return { x: -74, y: rules.players.length > 3? 4: 0, z: 20 }
    }

    return { x: -74, y: rules.players.length > 3? -5: -11, z: 20 }

  }
}