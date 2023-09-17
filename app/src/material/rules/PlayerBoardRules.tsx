/** @jsxImportSource @emotion/react */
import { MaterialRulesProps, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { FC } from 'react'
import { css } from '@emotion/react'
import { useTranslation } from 'react-i18next'

export const PlayerBoardRule: FC<MaterialRulesProps> = (props) => {
  const { item } = props
  const player = usePlayerId()
  const me = player && item.location!.player === player
  const name = usePlayerName(item.location!.player)
  const { t } = useTranslation()
  return (
    <>
      <h2 css={norse}>{t(me? 'rule.playerboard.name.me': 'rule.playerboard.name', { player: name })}</h2>
      <p>{t('rule.playerboard.text')}</p>
    </>
  )
}

const norse = css`
  font-family: Norse, Arial, Serif
`