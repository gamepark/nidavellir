import GameView from '@gamepark/nidavellir/state/view/GameView'
import { FC } from 'react'
import MoveType from '@gamepark/nidavellir/moves/MoveType'
import { Cards } from '@gamepark/nidavellir/cards/Cards'
import { Card, DwarfType, RoyalOffering } from '@gamepark/nidavellir/cards/Card'
import { CardRulesDialogContent, RuleDetail } from './CardRulesDialogContent'
import { AgeCardRulesDialog } from '@gamepark/nidavellir/moves/RulesDialog/RulesDialog'
import { AgeCard } from '../material/card/AgeCard'
import { Trans } from 'react-i18next'
import { TransformCoinEffect } from '@gamepark/nidavellir/effects/types/TransformCoinEffect'

type AgeCardRulesDialogContentProps = {
  game: GameView;
  rulesDialog: AgeCardRulesDialog;
  close: () => void;
};

const AgeCardRulesDialogContent: FC<AgeCardRulesDialogContentProps> = (props) => {
  const { game, rulesDialog, close } = props
  const { card } = rulesDialog
  return (
    <CardRulesDialogContent
      game={ game }
      card={ card }
      close={ close }
      moveTypes={ [MoveType.MoveCard] }
      cardRules={ getCardRules(card.id!) }
      CardComponent={ AgeCard }
    />
  )
}

export const CARD_RULES = new Map<DwarfType | RoyalOffering, (card: Card) => RuleDetail>()
CARD_RULES.set(DwarfType.Warrior, () => ({
  header: <Trans defaults="age-card.rules.header.warrior"/>,
  description: [<Trans defaults="age-card.rules.desc.warrior" components={ [<strong/>] }/>]
}))
CARD_RULES.set(DwarfType.Hunter, () => ({
  header: <Trans defaults="age-card.rules.header.hunter"/>,
  description: [<Trans defaults="age-card.rules.desc.hunter" components={ [<strong/>] }/>]
}))
CARD_RULES.set(DwarfType.Miner, () => ({
  header: <Trans defaults="age-card.rules.header.miner"/>,
  description: [<Trans defaults="age-card.rules.desc.miner" components={ [<strong/>] }/>]
}))
CARD_RULES.set(DwarfType.Explorer, () => ({
  header: <Trans defaults="age-card.rules.header.explorer"/>,
  description: [<Trans defaults="age-card.rules.desc.explorer" components={ [<strong/>] }/>]
}))
CARD_RULES.set(DwarfType.Blacksmith, () => ({
  header: <Trans defaults="age-card.rules.header.blacksmith"/>,
  description: [<Trans defaults="age-card.rules.desc.blacksmith" components={ [<strong/>] }/>]
}))
CARD_RULES.set(RoyalOffering.RoyalOffering, (card: Card) => ({
  header: <Trans defaults="age-card.rules.header.royal-offering"/>,
  description: [
    <Trans
      defaults="age-card.rules.desc.royal-offering"
      components={ [<strong/>] }
      values={ { additionalValue: (card.effects![0] as TransformCoinEffect).additionalValue } }
    />
  ]
}))

const getCardRules = (id: number): RuleDetail => {
  const card = Cards[id]
  return CARD_RULES.get(card.type)!(card)!
}

export { AgeCardRulesDialogContent }
