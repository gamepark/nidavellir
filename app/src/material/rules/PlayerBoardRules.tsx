/** @jsxImportSource @emotion/react */
import { MaterialRulesProps, usePlayerId, usePlayerName } from '@gamepark/react-game'
import { FC } from 'react'
import { css } from '@emotion/react'
import { Trans, useTranslation } from 'react-i18next'
import Images from '../../images/Images'

export const PlayerBoardRule: FC<MaterialRulesProps> = (props) => {
  const { item } = props
  const player = usePlayerId()
  const me = player && item.location!.player === player
  const name = usePlayerName(item.location!.player)
  const { t } = useTranslation()
  return (
    <>
      <h2 css={norse}>{t(me? 'rule.playerboard.name.me': 'rule.playerboard.name', { player: name })}</h2>
      <p>
        <Trans defaults="rule.playerboard.text">
          <div css={icon(Images.HunterIcon)} />
          <div css={icon(Images.BlacksmithIcon)} />
        </Trans>
      </p>
    </>
  )
}

const icon = (image: string) => css`
  height: 1.2em;
  width: 1.2em;
  background-image: url(${image});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  display: inline-block;
  transform: translateY(0.3em);
`

const norse = css`
  font-family: Norse, Arial, Serif
`