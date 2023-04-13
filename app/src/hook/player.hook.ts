import { PlayerId } from '@gamepark/nidavellir/state/Player'
import { useTranslation } from 'react-i18next'
import { TFunction } from 'i18next'
import { usePlayer } from '@gamepark/react-client'
import { useMemo } from 'react'

export const usePlayerName = (playerId: PlayerId) => {
  const { t } = useTranslation()
  const playerInfo = usePlayer(playerId)
  return useMemo(() => getPlayerName(t, playerId, playerInfo?.name), [playerId, playerInfo?.name])

}

export const getPlayerName = (t: TFunction, playerId: PlayerId, playerName?: string) => {
  return playerName ?? t('player.name', { player: playerId })
}
