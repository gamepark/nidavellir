/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { DwarfType } from '@gamepark/nidavellir/cards/DwarfType'
import { MaterialType } from '@gamepark/nidavellir/material/MaterialType'
import { LocationDescription, MaterialContext } from '@gamepark/react-game'
import { Coordinates, Location } from '@gamepark/rules-api'
import { cardDescription } from '../material/DwarfCardDescription'
import { playerBoardDescription } from '../material/PlayerBoardDescription'
import { tableLocator } from './TableLocator'

export class ArmyLocatorDescription extends LocationDescription {
  width = cardDescription.width + 0.4
  height = 22
  alwaysVisible = true

  getCoordinates(location: Location, context: MaterialContext): Coordinates {
    const playerBoard = playerBoardDescription.getStaticItems(context).find((i) => i.location.player === location.player)!
    const playerBoardPosition = tableLocator.getPosition(playerBoard, {
      ...context, type: MaterialType.PlayerBoard, index: 0, displayIndex: 0
    })
    const playerX = playerBoardPosition.x!
    const boardLeft = (playerBoardDescription.width / 2) + (this.width / 2)
    const locationLeft = boardLeft + (location.id! - 1) * this.width

    const playerY = playerBoardPosition.y!
    return { x: playerX + locationLeft, y: playerY + 1.77, z: 0 }
  }

  getExtraCss = (location: Location) => {
    const background = this.getBackground(location.id)
    return css`
      background: linear-gradient(180deg, ${background}60 0%, ${background}00 100%);
      border-radius: 0.3em;
    `
  }

  getBackground(type: DwarfType) {
    switch (type) {
      case DwarfType.Blacksmith:
        return '#4c2c9f'
      case DwarfType.Hunter:
        return '#277d53'
      case DwarfType.Explorer:
        return '#54a9e1'
      case DwarfType.Miner:
        return '#f0782d'
      case DwarfType.Warrior:
        return '#8f3526'
    }

    return ''
  }
}