/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Tavern } from '@gamepark/nidavellir/material/Tavern'
import { LocationDescription, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'
import Images from '../images/Images'
import { PlayerBoardSpaceRules } from './rules/PlayerBoardSpaceRules'

export class TavernLocatorDescription extends LocationDescription {
  getLocationSize(location: Location, context: MaterialContext) {
    if (!location.id) return this.getPlaceholderSize(context)
    return { height: 8, width: 8 }
  }

  getPlaceholderSize({ rules }: MaterialContext) {
    switch (rules.players.length) {
      case 2:
      case 3:
        return { height: 28.5, width: 30 }
      case 4:
        return { height: 28.5, width: 37 }
      case 5:
      default:
        return { height: 28.5, width: 43 }
    }
  }

  borderRadius = 0.5

  images = {
    [Tavern.LaughingGoblin]: Images.LaughingGoblin,
    [Tavern.DancingDragon]: Images.DancingDragon,
    [Tavern.ShiningHorse]: Images.ShiningHorse
  }

  getExtraCss(location: Location) {
    if (location.id) return
    return css`
      background: #FAEBD780;
      pointer-events: none;
    `
  }

  help = PlayerBoardSpaceRules
}
