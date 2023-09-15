import { useTranslation } from 'react-i18next'
import { useRules } from '@gamepark/react-game/dist/hooks/useRules'
import { NidavellirRules } from '@gamepark/nidavellir/NidavellirRules'
import { usePlayerId } from '@gamepark/react-game/dist/hooks/usePlayerId'
import { usePlayerName } from '@gamepark/react-game/dist/hooks/usePlayerName'

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