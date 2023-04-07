/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { FC } from 'react'
import { useAnimation, usePlayerId } from '@gamepark/react-client'
import { View } from '../material/View'
import GameView from '@gamepark/nidavellir/state/view/GameView'
import { PlayerId } from '@gamepark/nidavellir/state/Player'
import { playerPanelHeight, playerPanelsWidth } from '../material/Styles'
import { getAnimationComponent } from './utils/animation.utils'

type AnimationPreviewProps = {
  game: GameView;
  player: PlayerId;
  view?: View;
};

const AnimationPreviews: FC<AnimationPreviewProps> = (props) => {
  const { player, game, view } = props
  const me = usePlayerId()
  const playerPanelIndex = game.players.findIndex((p) => p.id === player)!
  const animation = useAnimation()
  const AnimationComponent = getAnimationComponent(game, player, animation, view)
  const hidden = !animation || player === me

  if (!AnimationComponent || hidden) {
    return null
  }

  return (
    <div
      css={ [playerAnimationPosition(playerPanelIndex), playerAnimation] }
    >
      <AnimationComponent animation={ animation } game={ game }/>
    </div>
  )
}

const playerAnimationPosition = (index: number) => css`
  position: absolute;
  opacity: 1;
  transition: opacity 0.2s;
  transform: translate3d(-110%, ${ 1.5 + index * (1 + playerPanelHeight) }em, 1000em);
`

const playerAnimation = css`
  background-color: #c3ebf1;
  border-radius: 1em;
  border: 0.1em solid black;
  width: ${ playerPanelsWidth }em;
  height: ${ playerPanelHeight }em;

  &:after {
    content: '';
    position: absolute;
    right: 0;
    top: 50%;
    width: 0;
    height: 0;
    border: 3em solid transparent;
    border-left-color: #c3ebf1;
    border-right: 0;
    margin-top: -3em;
    margin-right: -3em;
  }
`

export { AnimationPreviews }
