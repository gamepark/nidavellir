/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { FC } from 'react'
import { Tavern } from '../material/tavern/Tavern'
import { CoinToken } from '../material/coin/CoinToken'
import { Animation } from '@gamepark/react-client'
import { MoveCoin } from '@gamepark/nidavellir/moves/MoveCoin'
import GameView from '@gamepark/nidavellir/state/view/GameView'
import { isThisCoin } from '@gamepark/nidavellir/utils/coin.utils'
import { tavernHeight, tavernWidth } from '../material/Styles'
import { useTranslation } from 'react-i18next'

type BidRevelationAnimationProps = {
  animation: Animation<MoveCoin>;
  game: GameView;
};

const BidRevelationAnimation: FC<BidRevelationAnimationProps> = (props) => {
  const { game, animation } = props
  const { t } = useTranslation()
  const coin = game.coins.find((c) => isThisCoin(c, animation.move))!

  if (animation.move.target || !animation.move.reveal) {
    return null
  }

  const currentTavern = game.tavern

  return (
    <div css={ animationStyle }>
      <div css={ header }>
        <span>{ t('player.animation.bid') }</span>
      </div>
      <div css={ content }>
        <Tavern tavern={ currentTavern } css={ tavernAnimation }/>
        <span css={ arrow }>&gt;</span>
        <CoinToken coin={ coin } css={ coinStyle }/>
      </div>


    </div>
  )
}

const animationStyle = css`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
`

const header = css`
  flex: 1;
  justify-content: center;
  align-items: center;

  > span {
    font-size: 4em;
    padding-left: 0.3em;
    padding-top: 0.4em;
    color: black;
    font-family: 'Norse', serif;
    font-weight: bold;
  }
`

const content = css`
  flex: 3;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`

const coinStyle = css`
  position: relative;
  height: 10em;
  width: 10em;
  bottom: 1px;
`

const tavernAnimation = css`
  position: relative;
  top: unset;
  left: unset;
  height: ${ tavernHeight * 0.3 }em;
  width: ${ tavernWidth * 0.3 }em;
`

const arrow = css`
  font-size: 10em;
  font-family: 'Norse', serif;
  color: black;
  font-weight: bold;
  margin: 0 0.2em;
`

export {
  BidRevelationAnimation
}
