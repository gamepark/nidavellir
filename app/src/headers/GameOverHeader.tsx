/** @jsxImportSource @emotion/react */
import { usePlayerId, usePlayerName, useRules } from '@gamepark/react-game'
import { useTranslation } from 'react-i18next'
import { NidavellirRules } from '@gamepark/nidavellir/NidavellirRules'

export const GameOverHeader = () => {
  const { t } = useTranslation()
  const rules = useRules<NidavellirRules>()
  const player = usePlayerId()
  const bestScore = rules ? Math.max(...rules.game.players.map(player => rules.getScore(player))) : 0
  const winners = rules?.game.players.filter(player => rules.getScore(player) === bestScore) ?? []
  const winnerName = usePlayerName(winners[0])
  if (winners.length === 1) {
    if (winners[0] !== player) {
      return <>{t('game.over', { player: winnerName, score: bestScore })}</>
    } else {
      return <>{t('game.over.win', { score: bestScore })}</>
    }
  } else {
    return <>{t('game.over.tie', { score: bestScore })}</>
  }
}
