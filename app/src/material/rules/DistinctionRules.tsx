/** @jsxImportSource @emotion/react */
import { MaterialRulesProps, usePlay, useRules } from '@gamepark/react-game'
import { Trans, useTranslation } from 'react-i18next'
import { FC } from 'react'
import { css } from '@emotion/react'
import { Gem } from '@gamepark/nidavellir/material/Gem'
import { Distinction } from '@gamepark/nidavellir/material/Distinction'
import Images from '../../images/Images'
import { NidavellirRules } from '@gamepark/nidavellir/NidavellirRules'
import { MaterialType } from '@gamepark/nidavellir/material/MaterialType'
import { MaterialItem, displayMaterialRules } from '@gamepark/rules-api'
import { isSameLocation } from './DwarfCardRules'

export const DistinctionRules: FC<MaterialRulesProps> = (props) => {
  const { t } = useTranslation()
  const { item, itemIndex } = props
  const play = usePlay()
  const rules = useRules<NidavellirRules>()!
  const special = item.id === Gem.Gem6
  const { previous, next } = getDistinctionNavigation(rules, item, itemIndex!)

  return (
    <>
      <h2 css={[title, norse, normal]}>
        { !!previous.length && <div css={ [navigation, normal] } onClick={ () => play(displayMaterialRules(MaterialType.Distinction, previous.getItem(), previous.getIndex()), {local: true})}><span>&lt;</span></div> }
        <Trans defaults={`distinction.name.${item.id}`}>
          <strong/>
          <div css={iconStyle(getIcon(item.id))} />
        </Trans>
        { !!next.length && <div css={ navigation } onClick={ () => play(displayMaterialRules(MaterialType.Distinction, next.getItem(), next.getIndex()), {local: true})}><span>&gt;</span></div> }
      </h2>
      <h2 css={[title, norse, normal]}>
      </h2>
      <p>{t(`rule.distinction.${item.id}`)}</p>
      {special && <>
          <hr/>
          <p>{t('rule.gem.crown-jeweler')}</p></>}
    </>
  )
}


const getDistinctionNavigation = (rules: NidavellirRules, item: Partial<MaterialItem>, itemIndex: number) => {
  const cards = rules.material(MaterialType.Distinction)
    .sort((item) => item.location.x!)
    .filter((other) => isSameLocation(item, other))

  const indexes = cards.getIndexes()
  const previous = cards.index(indexes[indexes.indexOf(itemIndex!) - 1])
  const next = cards.index(indexes[indexes.indexOf(itemIndex!) + 1])
  return { previous, next }
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

const navigation = css`
  margin-left: 0.4em;
  margin-right: 0.4em;
  padding-left: 0.4em;
  padding-right: 0.4em;
  border-radius: 0.2em;
  border: 0.05em solid black;
  box-sizing: border-box;
  cursor: pointer;
  ${normal}

  &:hover,
  &:active {
    background-color: white;
  }
`

const norse = css`
  font-family: Norse, Arial, Serif
`