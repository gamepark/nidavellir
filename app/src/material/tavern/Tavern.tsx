/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { FC, HTMLAttributes } from 'react'
import Images from '../../images/Images'
import { tavernHeight, tavernLeft, tavernTop, tavernWidth } from '../Styles'
import { setRulesDialog, tavernRulesDialog } from '@gamepark/nidavellir/moves/RulesDialog/RulesDialog'
import { usePlay } from '@gamepark/react-client'

type TavernProps = {
  tavern: number;
  scale?: number;
  playerCount?: number;
} & HTMLAttributes<HTMLDivElement>;

const Tavern: FC<TavernProps> = (props) => {
  const play = usePlay()
  const { tavern, playerCount, scale, ...rest } = props

  const onTavernClick = () => {
    play(setRulesDialog(tavernRulesDialog(tavern)), { local: true })
  }

  return <div css={ tavernStyle(tavern, scale, playerCount) } onClick={ onTavernClick } { ...rest } />
}

const tavernStyle = (tavern: number, scale: number = 1, playerCount?: number) => css`
  position: absolute;
  cursor: pointer;
  height: ${ tavernHeight * scale }em;
  width: ${ tavernWidth * scale }em;
  top: ${ tavernTop(tavern) }em;
  left: ${ tavernLeft(playerCount) }em;
  background-image: url(${ TavernImages.get(tavern) });
  background-size: cover;
`

const TavernImages = new Map<number, any>()
TavernImages.set(0, Images.LaughingGoblin)
TavernImages.set(1, Images.DancingDragon)
TavernImages.set(2, Images.ShiningHorse)

export { Tavern }
