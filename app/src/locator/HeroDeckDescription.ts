/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { LocationDescription, MaterialContext } from '@gamepark/react-game'
import { Location } from '@gamepark/rules-api'

export class HeroDeckDescription extends LocationDescription {
  height = 28.5
  width = 46.5
  alwaysVisible = true
  extraCss = css`background: #FAEBD780; border-radius: 0.5em; pointer-events: none`

  getCoordinates(_location: Location, { rules }: MaterialContext) {
    if (rules.players.length > 3) return { x: 4.2, y: -14, z: 0}

    return { x: -13.8, y: -20, z: 0}
  }

}