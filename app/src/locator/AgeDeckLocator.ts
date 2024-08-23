/** @jsxImportSource @emotion/react */
import { LocationType } from '@gamepark/nidavellir/material/LocationType'
import { DeckLocator, ItemContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { cardDescription } from '../material/DwarfCardDescription'

export class AgeDeckLocator extends DeckLocator {
  limit = 10

  getCoordinates(location: Location, { rules }: ItemContext) {
    const x = -74
    const players = rules.players.length
    const y = players > 3 ? -23 : -29
    if (location.type === LocationType.Age1Deck) return { x, y }
    return { x, y: y + cardDescription.height + 1 }
  }
}
