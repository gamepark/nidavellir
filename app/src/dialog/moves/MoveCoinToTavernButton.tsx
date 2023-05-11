/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { FC } from 'react'
import { Trans } from 'react-i18next'
import { MoveCoin } from '@gamepark/nidavellir/moves/MoveCoin'
import GameView from '@gamepark/nidavellir/state/view/GameView'
import { CoinToken } from '../../material/coin/CoinToken'

type MoveCoinButtonProps = {
  move: MoveCoin;
  game: GameView;
};

const MoveCoinToTavernButton: FC<MoveCoinButtonProps> = (props) => {
  const { move, game } = props
  const coin = game.coins.find((c) => c.id === move.id)!
  return (
    <>
      <div css={ textContainer }>
        <Trans
          defaults="coin.moves.to-tavern"
          components={ [
            <span css={ buttonStyle }/>,
            <CoinToken css={ innerCoinStyle } coin={ coin }/>
          ] }
        />
      </div>
    </>
  )
}

const textContainer = css`
  flex: 1;
  text-align: left;
  display: flex;
  margin-left: 1em;
  align-items: center;
`

const innerCoinStyle = css`
  width: 5em;
  height: 5em;
  position: relative;
  margin-left: 1em;
  margin-right: 1em;
`

const buttonStyle = css`
  font-size: 3em;
`

export { MoveCoinToTavernButton }
