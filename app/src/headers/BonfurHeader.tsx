import { useTranslation } from 'react-i18next'
import { NidavellirRules } from '@gamepark/nidavellir/NidavellirRules'
import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'

export const BonfurHeader = () => {
  const rules = useRules<NidavellirRules>()!
  const player = rules.getActivePlayer()!
  const name = usePlayerName(player)
  const playerId = usePlayerId()
  const me = playerId === player
  const { t } = useTranslation()

  if (me) {
    return <>{t('header.bonfur.me')}</>
  }
  return <>{t('header.bonfur', { player: name })}</>
}