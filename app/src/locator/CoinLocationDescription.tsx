/** @jsxImportSource @emotion/react */
import { CustomMoveType } from '@gamepark/nidavellir/moves/CustomMoveType'
import { DropAreaDescription, MaterialContext } from '@gamepark/react-game'
import { isCustomMoveType, Location, MaterialMove } from '@gamepark/rules-api'
import { coinDescription } from '../material/CoinDescription'

export class CoinLocationDescription extends DropAreaDescription {
  width = coinDescription.diameter
  ratio = 1
  borderRadius = this.width / 2

  isMoveToLocation(move: MaterialMove, location: Location, context: MaterialContext) {
    if (isCustomMoveType(CustomMoveType.TradeCoins)(move)) {
      return move.data && move.data.includes(location.parent)
    }

    return super.isMoveToLocation(move, location, context)
  }
}
