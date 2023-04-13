/** @jsxImportSource @emotion/react */
import { FC, useCallback } from 'react'
import { CoinToken } from './CoinToken'
import MoveType from '@gamepark/nidavellir/moves/MoveType'
import { MoveCoin } from '@gamepark/nidavellir/moves/MoveCoin'
import GameView from '@gamepark/nidavellir/state/view/GameView'
import { usePlayerId } from '@gamepark/react-client'
import { useLegalMoves } from '../../hook/rules.hook'
import { SecretCoin } from '@gamepark/nidavellir/state/view/SecretCoin'
import {
  isInDistinctionDeck,
  isInPlayerHand,
  isInTreasure,
  isOnPlayerBoard
} from '@gamepark/nidavellir/utils/location.utils'
import {
  coinPositionInDiscardX,
  coinPositionInDiscardY,
  getCoinPositionInHandRotate,
  getCoinPositionInHandX,
  getCoinPositionInHandY,
  getCoinPositionInTreasureX,
  getCoinPositionInTreasureY,
  getCoinPositionOnPlayerBoardRotation,
  getCoinPositionOnPlayerBoardX,
  getCoinPositionOnPlayerBoardY,
  playerBoardPositions
} from '../Styles'
import { Coins } from '@gamepark/nidavellir/coins/Coins'
import { TransformCoin } from '@gamepark/nidavellir/moves/TransformCoin'
import { TradeCoins } from '@gamepark/nidavellir/moves/TradeCoins'
import { filterCoinMoves } from '@gamepark/nidavellir/utils/coin.utils'

type CoinTokensProps = {
  game: GameView;
};

const CoinTokens: FC<CoinTokensProps> = (props) => {
  const { game } = props
  const playerId = usePlayerId()
  const moves = useLegalMoves<MoveCoin | TransformCoin | TradeCoins>(game, [
    MoveType.MoveCoin,
    MoveType.TransformCoin,
    MoveType.TradeCoins
  ], playerId)
  const getCoinTokenMoves = useCallback(
    (c: SecretCoin) => moves.filter((m) => filterCoinMoves(game, c, m)),
    [game, moves]
  )

  const selectedCoin = game.selectedCoin
  return (
    <>
      { game.coins.map((coin, index) => (
        <CoinToken
          coin={ coin }
          key={ index }
          moves={ getCoinTokenMoves(coin) }
          transform={ coinTransform }
          disabled={ isInPlayerHand(coin.location) && selectedCoin !== undefined && selectedCoin !== coin.id }
        />
      )) }
    </>
  )
}

const coinTransform = (coin: SecretCoin, playerPositions: any) => {
  if (isInPlayerHand(coin.location)) {
    const position = playerBoardPositions[playerPositions[coin.location.player]]
    return `translate3d(${ getCoinPositionInHandX(coin.location.index!, position) }em, ${ getCoinPositionInHandY(
      position
    ) }em, ${ (coin.location.index ?? 0) + 1 }em) ${ getCoinPositionInHandRotate(position) }`
  }

  if (isInTreasure(coin.location)) {
    const token = Coins[coin.id!]
    return `translate3d(${ getCoinPositionInTreasureX(token, coin.location.z) }em, ${ getCoinPositionInTreasureY(
      token,
      coin.location.z
    ) }em, ${ (coin.location.z ?? 0) + 1 }em)`
  }

  if (isOnPlayerBoard(coin.location)) {
    const position = playerBoardPositions[playerPositions[coin.location.player]]
    return `translate3d(${ getCoinPositionOnPlayerBoardX(
      position,
      coin.location.index!
    ) }em, ${ getCoinPositionOnPlayerBoardY(position, coin.location.index!) }em, ${
      (coin.location.index ?? 0) + 1
    }em) ${ getCoinPositionOnPlayerBoardRotation(position) }`
  }

  if (isInDistinctionDeck(coin.location)) {
    return `
      translate3d(42em, 160em, 0em)
    `
  }

  return `translate3d(${ coinPositionInDiscardX(coin.location.index) }em, ${ coinPositionInDiscardY(
    coin.location.index
  ) }em, ${ coin.location.index + 1 }em)`
}

export { CoinTokens }
