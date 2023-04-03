/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { FC } from 'react'
import { Animation } from '@gamepark/react-client'
import GameView from '@gamepark/nidavellir/state/view/GameView'
import { AgeCard } from '../material/card/AgeCard'
import { isThisCard } from '@gamepark/nidavellir/utils/card.utils'
import { MoveCard } from '@gamepark/nidavellir/moves/MoveCard'
import { cardRatio } from '../material/Styles'
import { useTranslation } from 'react-i18next'

type MoveCardAnimationProps = {
  animation: Animation<MoveCard>;
  title: string;
  game: GameView;
};

const MoveCardAnimation: FC<MoveCardAnimationProps> = (props) => {
  const {game, title, animation} = props
  const {t} = useTranslation()
  const card = game.cards.find((c) => isThisCard(c, animation.move))!

  return (
    <div css={animationStyle}>
      <div css={header}>
        <span>{t(title)}</span>
      </div>
      <div css={content}>
        <AgeCard card={card} css={cardStyle}/>
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

const cardHeight = 15
const cardStyle = css`
  position: relative;
  height: ${cardHeight}em;
  width: ${cardHeight * cardRatio}em;

  > div {
    border-radius: 0.8em;
  }
`
export {
  MoveCardAnimation
}
