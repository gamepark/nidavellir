/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { NidavellirRules } from '@gamepark/nidavellir/NidavellirRules'
import { Player } from '@gamepark/react-client'
import { PlayerPanel, usePlayerTime, useRules } from '@gamepark/react-game'
import { FC, HTMLAttributes } from 'react'
import { PlayerPanelCounter } from './PlayerPanelCounter'
import { PlayerPanelTaverns } from './PlayerPanelTaverns'

type NidavellirPlayerPanelProps = {
  player: Player
} & HTMLAttributes<HTMLDivElement>

export const NidavellirPlayerPanel: FC<NidavellirPlayerPanelProps> = (props) => {
  const { player, ...rest } = props
  const rules = useRules<NidavellirRules>()!
  const timer = usePlayerTime(player.id)
  const leftScore = (!timer || rules.isOver()) && player?.gamePointsDelta === undefined
  return (

    <PlayerPanel key={player.id} playerId={player.id} {...rest}>
      <div css={indicators(leftScore)}>
        <PlayerPanelCounter value={rules?.getScore(player.id)!} icon={faStar} />
      </div>
      <PlayerPanelTaverns player={player} />
    </PlayerPanel>
  )

}

const indicators = (left: boolean) => css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 3.6em;
  transition: 0.2s left, 0.2s right;
  ${left? `left: 6.5em;`: `right: 1em`};
  flex-wrap: wrap;
`
