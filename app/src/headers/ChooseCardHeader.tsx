import { useTranslation } from 'react-i18next'
import { useRules } from '@gamepark/react-game/dist/hooks/useRules'
import { NidavellirRules } from '@gamepark/nidavellir/NidavellirRules'
import { Memory } from '@gamepark/nidavellir/rules/Memory'
import { usePlayerId } from '@gamepark/react-game/dist/hooks/usePlayerId'
import { usePlayerName } from '@gamepark/react-game/dist/hooks/usePlayerName'

export const ChooseCardHeader = () => {
  const rules = useRules<NidavellirRules>()!
  const tavern = rules.remind(Memory.Tavern)
  const player = rules.getActivePlayer()
  const { t } = useTranslation()
  const name = usePlayerName(player)
  const playerId = usePlayerId()
  const me = playerId === player

  if (me) {
    return <>{t('header.choose-card.me', { tavern: t(`tavern.${tavern}`)})}</>
  }
  return <>{t('header.choose-card', { tavern: t(`tavern.${tavern}`), player: name })}</>
}