import { useTranslation } from 'react-i18next'
import { useRules } from '@gamepark/react-game/dist/hooks/useRules'
import { NidavellirRules } from '@gamepark/nidavellir/NidavellirRules'
import { usePlayerId } from '@gamepark/react-game/dist/hooks/usePlayerId'
import { usePlayerName } from '@gamepark/react-game/dist/hooks/usePlayerName'

export const RecruitHeroHeader = () => {
  const rules = useRules<NidavellirRules>()!
  const player = rules.getActivePlayer()
  const { t } = useTranslation()
  const name = usePlayerName(player)
  const playerId = usePlayerId()
  const me = playerId === player

  if (me) {
    return <>{t('header.recruit-hero.me')}</>
  }
  return <>{t('header.recruit-hero', { player: name })}</>
}