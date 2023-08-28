/** @jsxImportSource @emotion/react */
import { GameTable } from '@gamepark/react-game'
import { PlayerPanels } from "./player/PlayerPanels";
import { css } from "@emotion/react";

export const GameDisplay = () => {
  return <>
    <GameTable xMin={-79} xMax={62} yMin={-34} yMax={34} margin={{ top: 7, left: 0, right: 0, bottom: 0 }} css={css`background-color: transparent`}/>
    <PlayerPanels/>
  </>

}
