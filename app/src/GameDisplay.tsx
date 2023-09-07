/** @jsxImportSource @emotion/react */
import { GameTable, usePlayers } from '@gamepark/react-game'
import { PlayerPanels } from "./player/PlayerPanels";
import { css, Global } from "@emotion/react";
import { pointerWithin } from '@dnd-kit/core'

export const GameDisplay = () => {
  const players = usePlayers()
  if (!players.length) return null;
  const bigTable = players.length > 3
  return <>
    <GameTable collisionAlgorithm={pointerWithin} xMin={-79} xMax={62} yMin={bigTable ? -64: -34} yMax={34} margin={{ top: 7, left: 0, right: bigTable? 30: 0, bottom: 0 }}/>
    <PlayerPanels/>
    <Global styles={style}/>
  </>

}

const style = css`
  @font-face {
    font-family: Norse;
    src: url(${process.env.PUBLIC_URL + '/norse/Norse.otf'}) format('opentype');
  }

  @font-face {
    font-family: Norse;
    font-weight: bold;
    src: url(${process.env.PUBLIC_URL + '/norse/NorseBold.otf'}) format('opentype');
  }
`
