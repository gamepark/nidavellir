/** @jsxImportSource @emotion/react */
import { usePlayerId, usePlayers } from '@gamepark/react-game'
import { FC } from 'react'
import { css } from '@emotion/react'
import { NidavellirPlayerPanel } from './panel/NidavellirPlayerPanel'

export const PlayerPanels: FC = () => {
  const players = usePlayers({ sortFromMe: true })
  const isSpectator = usePlayerId() === undefined
  return (
    <>
      {players.map((player, index) =>
        <NidavellirPlayerPanel key={player.id} player={player} css={panelPosition(index, players.length, isSpectator)} />
      )}
    </>
  )
}

const panelPosition = (index: number, players: number, isSpectator: boolean) => css`
  position: absolute;
  right: 1em;
  top: ${8.5 + (isSpectator ? index : (index || players) - 1) * 16}em;
  width: 28em;
  height: 14em;
`