import { useTranslation } from 'react-i18next'
import { useRules } from '@gamepark/react-game/dist/hooks/useRules'
import { NidavellirRules } from '@gamepark/nidavellir/NidavellirRules'
import { usePlayerId } from '@gamepark/react-game/dist/hooks/usePlayerId'
import { usePlayerName } from '@gamepark/react-game/dist/hooks/usePlayerName'

export const ThrudHeader = () => {
  const rules = useRules<NidavellirRules>()!
  const activePlayer = rules.getActivePlayer()!
  const playerId = usePlayerId()
  const player = usePlayerName(activePlayer)
  const me = playerId === activePlayer
  const { t } = useTranslation()
  if (me) {
    return <>{t('header.thrud.me')}</>
  }
  return <>{t('header.thrud', { player })}</>
}