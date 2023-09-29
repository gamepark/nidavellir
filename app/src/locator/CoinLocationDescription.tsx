/** @jsxImportSource @emotion/react */
import { LocationDescription, MaterialContext } from '@gamepark/react-game'
import { css } from '@emotion/react'
import { isCustomMoveType, Location, MaterialMove } from '@gamepark/rules-api'
import { coinDescription } from '../material/CoinDescription'
import { CustomMoveType } from '@gamepark/nidavellir/moves/CustomMoveType'

export class CoinLocationDescription extends LocationDescription {
  width = coinDescription.diameter
  ratio = 1
  alwaysVisible = false

  getExtraCss = () => css`
    border-radius: inherit;
  `

  protected isMoveToLocation(move: MaterialMove, location: Location, context: MaterialContext) {
    if (isCustomMoveType(CustomMoveType.TradeCoins)(move)) {
      return move.data && move.data.includes(location.parent)
    }

    return super.isMoveToLocation(move, location, context)
  }
}
