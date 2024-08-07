/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { MaterialType } from '@gamepark/nidavellir/material/MaterialType'
import { LocationDescription, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import { cardDescription } from '../material/DwarfCardDescription'
import { playerBoardDescription } from '../material/PlayerBoardDescription'
import { tableLocator } from './TableLocator'

export class CommandZoneLocatorDescription extends LocationDescription {
  width = cardDescription.width + 0.4
  height = 23.2
  alwaysVisible = true

  getCoordinates(location: Location, context: MaterialContext): Coordinates {
    const playerBoard = playerBoardDescription.getStaticItems(context).find((i) => i.location.player === location.player)!
    const playerBoardPosition = tableLocator.getPosition(playerBoard, {
      ...context, type: MaterialType.PlayerBoard, index: 0, displayIndex: 0
    })
    const playerX = playerBoardPosition.x!
    const boardLeft = (playerBoardDescription.width / 2) + (this.width / 2)
    const locationLeft = -boardLeft
    const playerY = playerBoardPosition.y!
    return { x: playerX + locationLeft, y: playerY + 1.45, z: 0 }
  }

  getExtraCss = () => css`
    background: linear-gradient(180deg, rgba(128, 128, 128, 0.6) 0%, rgba(128, 128, 128, 0) 100%);
    border-radius: 0.3em;
  `
}