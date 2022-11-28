/** @jsxImportSource @emotion/react */
import {css, keyframes} from '@emotion/react'
import GameView from '@gamepark/nidavellir/state/view/GameView'
import {Letterbox, Picture} from '@gamepark/react-components'
import Images from './images/Images'

type Props = {
  game: GameView
}

export default function GameDisplay({game}: Props) {
  return (
    <Letterbox css={letterBoxStyle} top={0}>
      <div css={sampleCss}>
          <pre style={{ width: '100%', fontSize: '.5em', height: '100%%'}}>{JSON.stringify(game, null, 4)}</pre>
      </div>
      <Picture src={Images.sampleImage} css={sampleImageCss}/>
    </Letterbox>
  )
}

const fadeIn = keyframes`
  from, 50% {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

const letterBoxStyle = css`
  animation: ${fadeIn} 3s ease-in forwards;
`

const sampleCss = css`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 3rem;
  background-color: black;
  padding: 0.5em;
  border-radius: 1em;
  height: 80%;
  width: 80%;
  overflow: scroll;
`

const sampleImageCss = css`
  position: absolute;
  bottom: 5%;
  left: calc(50% - 6.5em);
  width: 13em;
  height: 20em;
`
