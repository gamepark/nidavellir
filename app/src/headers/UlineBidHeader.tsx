import { useTranslation } from 'react-i18next'
import { NidavellirRules } from '@gamepark/nidavellir/NidavellirRules'
import { Memory } from '@gamepark/nidavellir/rules/Memory'
import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'

export const UlineBidHeader = () => {
  const rules = useRules<NidavellirRules>()!
  const tavern = rules.remind(Memory.Tavern)
  const player = rules.getActivePlayer()
  const { t } = useTranslation()
  const name = usePlayerName(player)
  const playerId = usePlayerId()
  const me = playerId === player

  if (me) {
    return <>{t('header.uline-bid.me', { tavern: t(`tavern.${tavern}`)})}</>
  }
  return <>{t('header.uline-bid', { tavern: t(`tavern.${tavern}`), player: name })}</>
}