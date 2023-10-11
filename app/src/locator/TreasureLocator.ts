/** @jsxImportSource @emotion/react */
import { LocationType } from '@gamepark/nidavellir/material/LocationType'
import { PlayerId } from '@gamepark/nidavellir/player/Player'
import { ItemContext } from '@gamepark/react-game'
import { Coordinates, MaterialItem } from '@gamepark/rules-api'
import { coinDescription } from '../material/CoinDescription'
import { GridLocator } from './GridLocator'

export class TreasureLocator extends GridLocator {
  delta = { x: 1, y: 0.5, z: 0.5 }
  columns = 3
  itemWidth = coinDescription.diameter
  itemHeight = coinDescription.diameter

  getCoordinates(_item: MaterialItem<PlayerId, LocationType>, { rules }: ItemContext): Coordinates {
    const players = rules.players.length
    const y = players > 3 ? -28 : -31
    const x = players > 3 ? 35 : 14
    return { x, y, z: 0 }
  }
}
