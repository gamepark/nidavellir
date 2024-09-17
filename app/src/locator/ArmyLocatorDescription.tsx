/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { DwarfType } from '@gamepark/nidavellir/cards/DwarfType'
import { DropAreaDescription } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import { cardDescription } from '../material/DwarfCardDescription'

export class ArmyLocatorDescription extends DropAreaDescription {
  width = cardDescription.width + 0.4
  height = 22
  borderRadius = 0.3

  getExtraCss = (location: Location) => {
    const background = this.getBackground(location.id)
    return css`
      background: linear-gradient(180deg, ${background}60 0%, ${background}00 100%);
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