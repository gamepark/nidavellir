/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { Distinction } from '@gamepark/nidavellir/material/Distinction'
import { MaterialHelpProps } from '@gamepark/react-game'
import { FC } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import Images from '../../images/Images'

export const DistinctionHelp: FC<MaterialHelpProps> = (props) => {
  const { t } = useTranslation()
  const { item } = props

  return (
    <>
      <h2 css={[title, norse, normal]}>
        <Trans defaults={`distinction.name.${item.id}`}>
          <strong/>
          <div css={iconStyle(getIcon(item.id))} />
        </Trans>
      </h2>
      <p>{t('rule.end-age-1')}</p>
      <hr />
      <p>{t(`rule.distinction.${item.id}`)}</p>
    </>
  )
}

const getIcon = (distinction: Distinction) => {
  switch (distinction) {
    case Distinction.KingsHand:
      return Images.WarriorIcon
    case Distinction.HuntingMaster:
      return Images.HunterIcon
    case Distinction.CrownJeweler:
      return Images.MinerIcon
    case Distinction.KingsGreatArmorer:
      return Images.BlacksmithIcon
    case Distinction.PioneerOfTheKingdom:
    default:
      return Images.ExplorerIcon
  }
}

const title = css`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 0.1em;
`

const normal = css`
  font-weight: normal;
`

const iconStyle = (icon: any) => css`
  width: 1.3em;
  height: 1.3em;
  //margin-right: 2em;
  background-image: url(${icon});
  background-size: cover;
  margin-left: 0.2em;
`

const norse = css`
  font-family: Norse, Arial, Serif
`
