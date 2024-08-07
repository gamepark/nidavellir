import { useTranslation } from 'react-i18next'
import { NidavellirRules } from '@gamepark/nidavellir/NidavellirRules'
import { usePlayerName, usePlayerId, useRules } from '@gamepark/react-game'

export const UlineHeader = () => {
  const rules = useRules<NidavellirRules>()!
  const activePlayer = rules.getActivePlayer()!
  const playerId = usePlayerId()
  const player = usePlayerName(activePlayer)
  const me = playerId === activePlayer
  const { t } = useTranslation()
  if (me) {
    return <>{t('header.uline.me')}</>
  }
  return <>{t('header.uline', { player })}</>
}