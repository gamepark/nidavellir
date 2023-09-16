import { useTranslation } from 'react-i18next'
import { useRules, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { NidavellirRules } from '@gamepark/nidavellir/NidavellirRules'

export const CrownJewelerHeader = () => {
  const rules = useRules<NidavellirRules>()!
  const player = rules.getActivePlayer()!
  const name = usePlayerName(player)
  const playerId = usePlayerId()
  const me = playerId === player
  const { t } = useTranslation()

  if (me) {
    return <>{t('header.crown-jeweler.me')}</>
  }
  return <>{t('header.crown-jeweler', { player: name })}</>
}