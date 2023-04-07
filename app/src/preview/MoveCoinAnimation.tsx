/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { FC } from 'react'
import { Animation } from '@gamepark/react-client'
import GameView from '@gamepark/nidavellir/state/view/GameView'
import { useTranslation } from 'react-i18next'
import { CoinToken } from '../material/coin/CoinToken'
import { isThisCoin } from '@gamepark/nidavellir/utils/coin.utils'
import { MoveCoin } from '@gamepark/nidavellir/moves/MoveCoin'

type MoveCoinAnimationProps = {
  animation: Animation<MoveCoin>;
  title: string;
  game: GameView;
};

const MoveCoinAnimation: FC<MoveCoinAnimationProps> = (props) => {
  const { game, title, animation } = props
  const { t } = useTranslation()
  const coin = game.coins.find((c) => isThisCoin(c, animation.move))!

  return (
    <div css={ animationStyle }>
      <div css={ header }>
        <span>{ t(title) }</span>
      </div>
      <div css={ content }>
        <CoinToken coin={ coin.id === undefined && animation.move.id !== undefined ? {
          id: animation.move.id,
          location: animation.move.target!
        } : coin } css={ coinStyle }/>
      </div>
    </div>
  )
}

const animationStyle = css`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: row;
`

const header = css`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  > span {
    font-size: 4em;
    padding-left: 0.3em;
    color: black;
    font-family: 'Norse', serif;
    font-weight: bold;
  }
`

const content = css`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`

const coinHeight = 10
const coinStyle = css`
  position: relative;
  height: ${ coinHeight }em;
  width: ${ coinHeight }em;
`
export {
  MoveCoinAnimation
}
