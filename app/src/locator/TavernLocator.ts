/** @jsxImportSource @emotion/react */
import { LocationType } from '@gamepark/nidavellir/material/LocationType'
import { Tavern } from '@gamepark/nidavellir/material/Tavern'
import { PlayerId } from '@gamepark/nidavellir/player/Player'
import { FlexLocator, ItemContext, MaterialContext } from '@gamepark/react-game'
import { Location, MaterialItem } from '@gamepark/rules-api'
import { cardDescription } from '../material/DwarfCardDescription'
import { TavernLocatorDescription } from './TavernLocatorDescription'

export class TavernLocator extends FlexLocator {
  locationDescription = new TavernLocatorDescription()
  locations = [
    { type: LocationType.Tavern },
    { type: LocationType.Tavern, id: Tavern.LaughingGoblin },
    { type: LocationType.Tavern, id: Tavern.DancingDragon },
    { type: LocationType.Tavern, id: Tavern.ShiningHorse }
  ]
  gap = { x: cardDescription.width + 1 }
  lineGap = { y: cardDescription.height + 1 }

  getLineSize(_location: Location, { rules }: ItemContext): number {
    return Math.max(rules.players.length, 3)
  }

  getAreaCoordinates(location: Location, context: MaterialContext) {
    if (!location.id) return this.getPlaceholderCoordinates(context)
    return this.getEmblemCoordinates(location, context)
  }

  getPlaceholderCoordinates({ rules }: MaterialContext) {
    switch (rules.players.length) {
      case 2:
      case 3:
        return { x: -54.2, y: -20 }
      case 4:
        return { x: -42, y: -14 }
      case 5:
      default:
        return { x: -45, y: -14 }
    }
  }

  getEmblemCoordinates(location: Location, context: MaterialContext) {
    const deltaX = this.getEmblemDeltaX(context)
    const { x, y } = this.getPlaceholderCoordinates(context)
    switch (location.id) {
      case Tavern.LaughingGoblin:
        return { x: x + deltaX, y: y - 8.9 }
      case Tavern.DancingDragon:
        return { x: x + deltaX, y }
      case Tavern.ShiningHorse:
      default:
        return { x: x + deltaX, y: y + 9.1 }
    }
  }

  getEmblemDeltaX({ rules }: MaterialContext) {
    switch (rules.players.length) {
      case 2:
      case 3:
        return -10
      case 4:
        return -13
      case 5:
      default:
        return -16
    }
  }

  getCoordinates(location: Location<PlayerId, LocationType>, { rules }: ItemContext) {
    const players = rules.players.length
    const baseY = players > 3 ? -23 : -29
    const x = this.getX(players)
    const tavernIndex = (location.id - 1)
    return { x, y: baseY + (cardDescription.height + 1) * tavernIndex }
  }

  getX(players: number) {
    switch (players) {
      case 2:
      case 3:
        return -56
      case 4:
        return -47
      case 5:
      default:
        return -53
    }
  }

  getHoverTransform(item: MaterialItem, _context: ItemContext) {
    const transforms = [
      'translateZ(10em)',
      'scale(2)'
    ]
    if (item.location.id! === Tavern.LaughingGoblin) {
      transforms.push('translateY(25%)')
    }

    return transforms
  }
}
