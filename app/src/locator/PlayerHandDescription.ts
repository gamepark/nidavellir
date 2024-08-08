/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { LocationDescription } from '@gamepark/react-game'

export class PlayerHandDescription extends LocationDescription {
  height = 5
  width = 22
  borderRadius = 0.3
  extraCss = css`background-color: rgba(0, 128, 0, 0.49)`
  coordinates = { x: -46.8, y: 9, z: 10}

}