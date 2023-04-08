/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import GameView from '@gamepark/nidavellir/state/view/GameView'
import { FC, useMemo, useState } from 'react'
import MoveType from '@gamepark/nidavellir/moves/MoveType'
import {
  Aegur,
  Aral,
  Astrid,
  Bonfur,
  Dagda,
  DwergAesir,
  DwergBergelmir,
  DwergJungir,
  DwergSigmir,
  DwergYmir,
  Grid,
  Heroes,
  Hourya,
  Idunn,
  Kraal,
  Lokdur,
  Skaa,
  Tarah,
  Thrud,
  Uline,
  Ylud,
  Zoral
} from '@gamepark/nidavellir/cards/Heroes'
import { Hero } from '@gamepark/nidavellir/cards/Hero'
import { CardRulesDialogContent, RuleDetail } from './CardRulesDialogContent'
import { HeroRulesDialog } from '@gamepark/nidavellir/moves/RulesDialog/RulesDialog'
import { HeroCard } from '../material/card/HeroCard'
import { Trans } from 'react-i18next'
import Images from '../images/Images'
import { BLACKSMITH_COLOR, EXPLORER_COLOR, HUNTER_COLOR, MINER_COLOR, WARRIOR_COLOR } from '../material/Styles'
import { isInArmy } from '@gamepark/nidavellir/utils/location.utils'

type HeroRulesDialogContentProps = {
  game: GameView;
  rulesDialog: HeroRulesDialog;
  close: () => void;
};

const HeroRulesDialogContent: FC<HeroRulesDialogContentProps> = (props) => {
  const { game, rulesDialog, close } = props
  const { hero } = rulesDialog
  const heroes = useMemo(() => game.heroes.filter((h) => {
    if (isInArmy(hero.location)) {
      return isInArmy(h.location) && hero.location.player === h.location.player
    }

    return h.location.type === hero.location.type
  }), [hero, game.heroes])
  const [currentHero, setCurrentHero] = useState(heroes.findIndex((h) => h.id === hero.id))
  const onNext = () => {
    if (currentHero === heroes.length - 1) {
      setCurrentHero(0)
      return
    }

    setCurrentHero(currentHero + 1)
  }
  const onPrevious = () => {
    if (currentHero === 0) {
      setCurrentHero(heroes.length - 1)
      return
    }

    setCurrentHero(currentHero - 1)
  }

  return (
    <CardRulesDialogContent
      game={ game }
      card={ heroes[currentHero] }
      close={ close }
      moveTypes={ [MoveType.MoveHero] }
      cardRules={ getCardRules(heroes[currentHero].id) }
      onNext={ heroes.length > 1 ? onNext : undefined }
      onPrevious={ heroes.length > 1 ? onPrevious : undefined }
      CardComponent={ HeroCard }
    />
  )
}

const CARD_RULES = new Map<Hero, (card: Hero) => RuleDetail>()
CARD_RULES.set(Bonfur, () => ({
  header: <Trans defaults="hero.rules.header.bonfur" components={ [<strong/>] }/>,
  description: [
    <Trans defaults="hero.rules.desc.bonfur" components={ [<strong/>] }/>,
    <div css={ divider }/>,
    <Trans defaults="age-card.rules.desc.blacksmith" components={ [<strong/>] }/>
  ]
}))
CARD_RULES.set(Aegur, () => ({
  header: <Trans defaults="hero.rules.header.aegur" components={ [<strong/>] }/>,
  description: [
    <Trans defaults="hero.rules.desc.aegur" components={ [<strong/>] }/>,
    <div css={ divider }/>,
    <Trans defaults="age-card.rules.desc.blacksmith" components={ [<strong/>] }/>
  ]
}))
CARD_RULES.set(Dagda, () => ({
  header: <Trans defaults="hero.rules.header.dagda" components={ [<strong/>] }/>,
  description: [
    <Trans defaults="hero.rules.desc.dagda" components={ [<strong/>] }/>,
    <div css={ divider }/>,
    <Trans defaults="age-card.rules.desc.hunter" components={ [<strong/>] }/>
  ]
}))
CARD_RULES.set(Aral, () => ({
  header: <Trans defaults="hero.rules.header.aral" components={ [<strong/>] }/>,
  description: [
    <Trans defaults="hero.rules.desc.aral" components={ [<strong/>] }/>,
    <div css={ divider }/>,
    <Trans defaults="age-card.rules.desc.hunter" components={ [<strong/>] }/>
  ]
}))
CARD_RULES.set(Kraal, () => ({
  header: <Trans defaults="hero.rules.header.kraal" components={ [<strong/>] }/>,
  description: [
    <Trans defaults="hero.rules.desc.kraal" components={ [<strong/>] }/>,
    <div css={ divider }/>,
    <Trans defaults="age-card.rules.desc.warrior" components={ [<strong/>] }/>
  ]
}))
CARD_RULES.set(Tarah, () => ({
  header: <Trans defaults="hero.rules.header.tarah" components={ [<strong/>] }/>,
  description: [
    <Trans defaults="hero.rules.desc.tarah" components={ [<strong/>] }/>,
    <div css={ divider }/>,
    <Trans defaults="age-card.rules.desc.warrior" components={ [<strong/>] }/>
  ]
}))
CARD_RULES.set(Lokdur, () => ({
  header: <Trans defaults="hero.rules.header.lokdur" components={ [<strong/>] }/>,
  description: [
    <Trans defaults="hero.rules.desc.lokdur" components={ [<strong/>] }/>,
    <div css={ divider }/>,
    <Trans defaults="age-card.rules.desc.miner" components={ [<strong/>] }/>
  ]
}))
CARD_RULES.set(Zoral, () => ({
  header: <Trans defaults="hero.rules.header.zoral" components={ [<strong/>] }/>,
  description: [
    <Trans defaults="hero.rules.desc.zoral" components={ [<strong/>] }/>,
    <div css={ divider }/>,
    <Trans defaults="age-card.rules.desc.miner" components={ [<strong/>] }/>
  ]
}))
CARD_RULES.set(Idunn, () => ({
  header: <Trans defaults="hero.rules.header.idunn" components={ [<strong/>] }/>,
  description: [
    <Trans defaults="hero.rules.desc.idunn" components={ [<strong/>] }/>,
    <div css={ divider }/>,
    <Trans defaults="age-card.rules.desc.explorer" components={ [<strong/>] }/>
  ]
}))
CARD_RULES.set(Hourya, () => ({
  header: <Trans defaults="hero.rules.header.hourya" components={ [<strong/>] }/>,
  description: [
    <Trans defaults="hero.rules.desc.hourya" components={ [<strong/>] }/>,
    <div css={ divider }/>,
    <Trans defaults="age-card.rules.desc.explorer" components={ [<strong/>] }/>
  ]
}))
CARD_RULES.set(Astrid, () => ({
  header: <Trans defaults="hero.rules.header.astrid" components={ [<strong/>] }/>,
  description: [<Trans defaults="hero.rules.desc.astrid" components={ [<strong/>] }/>]
}))
CARD_RULES.set(DwergYmir, () => ({
  header: <Trans defaults="hero.rules.header.dwerg-ymir" components={ [<strong/>] }/>,
  description: [<Trans defaults="hero.rules.desc.dwerg" components={ [<strong/>] }/>, <div css={ dwergScoring }/>]
}))
CARD_RULES.set(DwergJungir, () => ({
  header: <Trans defaults="hero.rules.header.dwerg-jungir" components={ [<strong/>] }/>,
  description: [<Trans defaults="hero.rules.desc.dwerg" components={ [<strong/>] }/>, <div css={ dwergScoring }/>]
}))
CARD_RULES.set(DwergAesir, () => ({
  header: <Trans defaults="hero.rules.header.dwerg-aesir" components={ [<strong/>] }/>,
  description: [<Trans defaults="hero.rules.desc.dwerg" components={ [<strong/>] }/>, <div css={ dwergScoring }/>]
}))
CARD_RULES.set(DwergSigmir, () => ({
  header: <Trans defaults="hero.rules.header.dwerg-sigmir" components={ [<strong/>] }/>,
  description: [<Trans defaults="hero.rules.desc.dwerg" components={ [<strong/>] }/>, <div css={ dwergScoring }/>]
}))
CARD_RULES.set(DwergBergelmir, () => ({
  header: <Trans defaults="hero.rules.header.dwerg-bergelmir" components={ [<strong/>] }/>,
  description: [<Trans defaults="hero.rules.desc.dwerg" components={ [<strong/>] }/>, <div css={ dwergScoring }/>]
}))

CARD_RULES.set(Ylud, () => ({
  header: <Trans defaults="hero.rules.header.ylud" components={ [<strong/>] }/>,
  description: [
    <Trans
      defaults="hero.rules.desc.ylud"
      components={ [
        <strong/>,
        <span css={ blacksmithColor }/>,
        <span css={ hunterColor }/>,
        <span css={ explorerColor }/>,
        <span css={ warriorColor }/>,
        <span css={ minerColor }/>
      ] }
    />
  ]
}))
CARD_RULES.set(Thrud, () => ({
  header: <Trans defaults="hero.rules.header.thrud" components={ [<strong/>] }/>,
  description: [<Trans defaults="hero.rules.desc.thrud" components={ [<strong/>] }/>]
}))
CARD_RULES.set(Uline, () => ({
  header: <Trans defaults="hero.rules.header.uline" components={ [<strong/>] }/>,
  description: [<Trans defaults="hero.rules.desc.uline" components={ [<strong/>] }/>]
}))

CARD_RULES.set(Skaa, () => ({
  header: <Trans defaults="hero.rules.header.skaa" components={ [<strong/>] }/>,
  description: [<Trans defaults="hero.rules.desc.skaa" components={ [<strong/>] }/>]
}))

CARD_RULES.set(Grid, () => ({
  header: <Trans defaults="hero.rules.header.grid" components={ [<strong/>] }/>,
  description: [<Trans defaults="hero.rules.desc.grid" components={ [<strong/>] } value={ { additionalValue: 7 } }/>]
}))

const divider = css`
  width: 20%;
  border-bottom: 0.1em solid rgba(0, 0, 0, 0.5);
`

const blacksmithColor = css`
  font-weight: bold;
  color: ${ BLACKSMITH_COLOR };
`
const hunterColor = css`
  font-weight: bold;
  color: ${ HUNTER_COLOR };
`
const explorerColor = css`
  font-weight: bold;
  color: ${ EXPLORER_COLOR };
`
const warriorColor = css`
  font-weight: bold;
  color: ${ WARRIOR_COLOR };
`
const minerColor = css`
  font-weight: bold;
  color: ${ MINER_COLOR };
`

const dwergScoringRatio = 400 / 122
const dwergScoring = css`
  width: 15em;
  height: ${ 15 / dwergScoringRatio }em;
  background-image: url(${ Images.DwergScoring });
  background-size: cover;
`

const getCardRules = (id: number) => {
  const card = Heroes[id]
  return CARD_RULES.get(card)!(card)
}

export { HeroRulesDialogContent }
