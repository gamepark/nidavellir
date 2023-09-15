import { useTranslation } from 'react-i18next'
import { useRules } from '@gamepark/react-game/dist/hooks/useRules'
import { NidavellirRules } from '@gamepark/nidavellir/NidavellirRules'
import { usePlayerId } from '@gamepark/react-game/dist/hooks/usePlayerId'
import { usePlayerName } from '@gamepark/react-game/dist/hooks/usePlayerName'
import { DrawCard, Memory } from '@gamepark/nidavellir/rules/Memory'

export const DrawCardHeader = () => {
  const rules = useRules<NidavellirRules>()!
  const player = rules.getActivePlayer()!
  const name = usePlayerName(player)
  const playerId = usePlayerId()
  const me = playerId === player
  const { t } = useTranslation()
  const drawCard = rules.remind<DrawCard>(Memory.DrawCard)

  if (me) {
    return <>{t('header.draw-card.me', { cards: drawCard.keep })}</>
  }
  return <>{t('header.draw-card', { player: name, cards: drawCard.keep })}</>
}