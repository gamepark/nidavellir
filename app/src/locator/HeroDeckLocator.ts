/** @jsxImportSource @emotion/react */
import { LocationType } from '@gamepark/nidavellir/material/LocationType'
import { MaterialType } from '@gamepark/nidavellir/material/MaterialType'
import { PlayerId } from '@gamepark/nidavellir/player/Player'
import { ItemContext } from '@gamepark/react-game'
import { Coordinates, MaterialItem } from '@gamepark/rules-api'
import { cardDescription } from '../material/DwarfCardDescription'
import { GridLocator } from './GridLocator'
import { HeroDeckDescription } from './HeroDeckDescription'

export class HeroDeckLocator extends GridLocator {
  locationDescription = new HeroDeckDescription()
  delta = { x: 1, y: 1 }
  columns = 7
  itemWidth = cardDescription.width
  itemHeight = cardDescription.height

  getCoordinates(_item: MaterialItem<PlayerId, LocationType>, { rules }: ItemContext<PlayerId, MaterialType, LocationType>): Coordinates {
    const players = rules.players.length
    const y = players > 3 ? -23 : -29
    const x = players > 3 ? -15 : -33
    return { x, y, z: cardDescription.thickness }
  }

}
