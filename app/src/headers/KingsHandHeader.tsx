import { useTranslation } from 'react-i18next'
import { NidavellirRules } from '@gamepark/nidavellir/NidavellirRules'
import { usePlayerName, usePlayerId, useRules } from '@gamepark/react-game'

export const KingsHandHeader = () => {
  const rules = useRules<NidavellirRules>()!
  const player = rules.getActivePlayer()!
  const name = usePlayerName(player)
  const playerId = usePlayerId()
  const me = playerId === player
  const { t } = useTranslation()

  if (me) {
    return <>{t('header.kings-hand.me')}</>
  }
  return <>{t('header.kings-hand', { player: name })}</>
}