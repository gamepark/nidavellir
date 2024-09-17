/** @jsxImportSource @emotion/react */
import { LocationType } from '@gamepark/nidavellir/material/LocationType'
import { FlexLocator, ItemContext } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { cardDescription } from '../material/DwarfCardDescription'
import { HeroDeckDescription } from './HeroDeckDescription'

export class HeroDeckLocator extends FlexLocator {
  locationDescription = new HeroDeckDescription()
  location = { type: LocationType.HeroesDeck }
  lineSize = 7
  maxLines = 3
  gap = { x: cardDescription.width + 1 }
  lineGap = { y: cardDescription.height + 1 }

  getCoordinates(_location: Location, { rules }: ItemContext) {
    const players = rules.players.length
    const y = players > 3 ? -23 : -29
    const x = players > 3 ? -15 : -33
    return { x, y }
  }

  getHoverTransform(item: MaterialItem, _context: ItemContext) {
    const transforms = [
      'translateZ(10em)',
      'scale(2)'
    ]
    if (item.location.x! < 7) {
      transforms.push('translateY(25%)')
    }

    return transforms
  }
}
