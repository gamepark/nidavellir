import { useTranslation } from 'react-i18next'
import { NidavellirRules } from '@gamepark/nidavellir/NidavellirRules'
import { usePlayerName, usePlayerId, useRules } from '@gamepark/react-game'

export const YludHeader = () => {
  const rules = useRules<NidavellirRules>()!
  const activePlayer = rules.getActivePlayer()!
  const playerId = usePlayerId()
  const player = usePlayerName(activePlayer)
  const me = playerId === activePlayer
  const { t } = useTranslation()
  if (me) {
    return <>{t('header.ylud.me')}</>
  }
  return <>{t('header.ylud', { player })}</>
}