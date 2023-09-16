import { useTranslation } from 'react-i18next'
import { useRules, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { NidavellirRules } from '@gamepark/nidavellir/NidavellirRules'
import { Dagda, Memory } from '@gamepark/nidavellir/rules/Memory'

export const DagdaHeader = () => {
  const rules = useRules<NidavellirRules>()!
  const activePlayer = rules.getActivePlayer()!
  const player = usePlayerName(activePlayer)
  const playerId = usePlayerId()
  const me = playerId === activePlayer
  const { t } = useTranslation()
  const cards = rules.remind<Dagda>(Memory.Dagda)? 1: 2
  if (me) {
    return <>{t('header.dagda.me', { cards })}</>
  }
  return <>{t('header.dagda', { player, cards })}</>
}