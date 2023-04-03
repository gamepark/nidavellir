/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { FC } from 'react'
import { Animation } from '@gamepark/react-client'
import GameView from '@gamepark/nidavellir/state/view/GameView'
import { cardRatio } from '../material/Styles'
import { MoveHero } from '@gamepark/nidavellir/moves/MoveHero'
import { HeroCard } from '../material/card/HeroCard'
import { useTranslation } from 'react-i18next'

type MoveHeroAnimationProps = {
  animation: Animation<MoveHero>;
  title: string;
  game: GameView;
};

const MoveHeroAnimation: FC<MoveHeroAnimationProps> = (props) => {
  const {game, title, animation} = props
  const {t} = useTranslation()
  const hero = game.heroes.find((c) => animation.move.id === c.id)!

  return (
    <div css={animationStyle}>
      <div css={header}>
        <span>{t(title)}</span>
      </div>
      <div css={content}>
        <HeroCard card={hero} css={cardStyle}/>
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
  MoveHeroAnimation
}
