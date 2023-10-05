/** @jsxImportSource @emotion/react */
import { LocationDescription, MaterialContext } from '@gamepark/react-game'
import { LocationType } from '@gamepark/nidavellir/material/LocationType'
import { css } from '@emotion/react'

export class PlayerHandDescription extends LocationDescription {
  height = 5
  width = 22
  borderRadius = 0.3
  extraCss = css`background-color: rgba(0, 128, 0, 0.49)`
  getLocations({ player }: MaterialContext) {
    if (!player) return []
    return [{ type: LocationType.Hand, player }]
  }
  coordinates = { x: -46.8, y: 9, z: 10}

}