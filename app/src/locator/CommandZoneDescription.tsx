/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { DropAreaDescription } from '@gamepark/react-game'
import { cardDescription } from '../material/DwarfCardDescription'

export class CommandZoneDescription extends DropAreaDescription {
  width = cardDescription.width + 0.4
  height = 23.2
  borderRadius = 0.3

  extraCss = css`
    background: linear-gradient(180deg, rgba(128, 128, 128, 0.6) 0%, rgba(128, 128, 128, 0) 100%);
  `
}