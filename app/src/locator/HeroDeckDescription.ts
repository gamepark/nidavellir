import { css } from '@emotion/react'
import { LocationDescription } from '@gamepark/react-game'

export class HeroDeckDescription extends LocationDescription {
  height = 28.5
  width = 46.5
  extraCss = css`
    background: #faebd780;
    border-radius: 0.5em;
    pointer-events: none;
  `
}
