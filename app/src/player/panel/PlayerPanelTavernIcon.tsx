/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { FC, HTMLAttributes } from 'react'
import Images from '../../images/Images'
import { Tavern } from '@gamepark/nidavellir/material/Tavern'

type TavernProps = {
  tavern: number;
  scale?: number;
  playerCount?: number;
} & HTMLAttributes<HTMLDivElement>;

const PlayerPanelTavernIcon: FC<TavernProps> = (props) => {
  const { tavern, playerCount, scale, ...rest } = props

  return <div css={tavernStyle(tavern)} {...rest} />
}

const tavernStyle = (tavern: Tavern) => css`
  position: absolute;
  cursor: pointer;
  top: 7.2em;
  left: ${(tavern - 1) * 9 + 1}em;
  height: 5em;
  width: 5em;
  background-image: url(${tavernImages[tavern]});
  background-size: cover;
`
const tavernImages = {
  [Tavern.LaughingGoblin]: Images.LaughingGoblin,
  [Tavern.DancingDragon]: Images.DancingDragon,
  [Tavern.ShiningHorse]: Images.ShiningHorse,
}

export { PlayerPanelTavernIcon }