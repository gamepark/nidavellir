/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { FC } from 'react'
import { Animation } from '@gamepark/react-client'
import GameView from '@gamepark/nidavellir/state/view/GameView'
import { useTranslation } from 'react-i18next'
import { MoveGem } from '@gamepark/nidavellir/moves/MoveGem'
import { gemRatio } from '../material/Styles'
import { GemToken } from '../material/gem/GemToken'

type MoveGemAnimationProps = {
  animation: Animation<MoveGem>;
  title: string;
  game: GameView;
};

const MoveGemAnimation: FC<MoveGemAnimationProps> = (props) => {
  const { game, title, animation } = props
  const { t } = useTranslation()
  const gem = game.gems.find((g) => g.id === animation.move.id)!

  return (
    <div css={ animationStyle }>
      <div css={ header }>
        <span>{ t(title) }</span>
      </div>
      <div css={ content }>
        <GemToken gem={ gem } css={ gemStyle }/>
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

const gemHeight = 15
const gemStyle = css`
  position: relative;
  height: ${ gemHeight }em;
  width: ${ gemHeight * gemRatio }em;
`
export {
  MoveGemAnimation
}
