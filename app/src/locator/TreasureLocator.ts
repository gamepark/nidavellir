/** @jsxImportSource @emotion/react */
import { FlexLocator, ItemContext, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { coinDescription } from '../material/CoinDescription'

export class TreasureLocator extends FlexLocator {
  gap = { x: coinDescription.diameter + 1 }
  lineGap = { y: coinDescription.diameter + 0.5 }
  lineSize = 3

  getCoordinates(_location: Location, { rules }: ItemContext) {
    const players = rules.players.length
    return { x: players > 3 ? 35 : 14, y: players > 3 ? -28 : -31 }
  }

  getLocationCoordinates(location: Location, context: MaterialContext, index?: number | undefined) {
    const { x = 0, y = 0 } = super.getLocationCoordinates(location, context, index)
    return { x: x + location.z! * 0.5, y, z: location.z! * 0.1 }
  }
}
