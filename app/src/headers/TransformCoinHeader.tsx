import { useTranslation } from 'react-i18next'
import { useRules } from '@gamepark/react-game/dist/hooks/useRules'
import { NidavellirRules } from '@gamepark/nidavellir/NidavellirRules'
import { usePlayerId } from '@gamepark/react-game/dist/hooks/usePlayerId'
import { usePlayerName } from '@gamepark/react-game/dist/hooks/usePlayerName'
import { Memory } from '@gamepark/nidavellir/rules/Memory'

export const TransformCoinHeader = () => {
  const rules = useRules<NidavellirRules>()!
  const player = rules.getActivePlayer()!
  const name = usePlayerName(player)
  const playerId = usePlayerId()
  const me = playerId === player
  const { t } = useTranslation()

  if (me) {
    return <>{t('header.transform-coin.me', { bonus: rules.remind(Memory.TransformBonus) })}</>
  }
  return <>{t('header.transform-coin', { player: name, bonus: rules.remind(Memory.TransformBonus) })}</>
}