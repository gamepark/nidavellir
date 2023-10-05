/** @jsxImportSource @emotion/react */
import { usePlayerId, usePlayers } from '@gamepark/react-game'
import { FC, useState } from 'react'
import { css } from '@emotion/react'
import { NidavellirPlayerPanel } from './panel/NidavellirPlayerPanel'
import { PlayerDialog } from './dialog/PlayerDialog'
import { PlayerId } from '@gamepark/nidavellir/player/Player'

export const PlayerPanels: FC = () => {
  const [playerDialog, setPlayerDialog] = useState<PlayerId | undefined>()
  const players = usePlayers({ sortFromMe: true })
  const isSpectator = usePlayerId() === undefined
  return (
    <>
      {players.map((player, index) =>
        <NidavellirPlayerPanel
          key={player.id}
          player={player}
          onClick={() => setPlayerDialog(player.id)}
          css={panelPosition(index, players.length, isSpectator)}
        />
      )}
      {!!playerDialog && <PlayerDialog open={!!playerDialog} player={playerDialog!} close={() => setPlayerDialog(undefined)}/>}
    </>
  )
}

const panelPosition = (index: number, players: number, isSpectator: boolean) => css`
  position: absolute;
  right: 1em;
  top: ${8.5 + (isSpectator ? index : (index || players) - 1) * 16}em;
  width: 28em;
  height: 14em;
  cursor: pointer;
`