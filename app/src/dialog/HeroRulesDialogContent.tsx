/** @jsxImportSource @emotion/react */
import GameView from '@gamepark/nidavellir/state/view/GameView';
import { FC } from 'react';
import MoveType from '@gamepark/nidavellir/moves/MoveType';
import { Aegur, Bonfur, Heroes } from '@gamepark/nidavellir/cards/Heroes';
import { Hero } from '@gamepark/nidavellir/cards/Hero';
import { CardRulesDialogContent, RuleDetail } from './CardRulesDialogContent';
import { HeroRulesDialog } from '@gamepark/nidavellir/moves/RulesDialog/RulesDialog';
import { HeroCard } from '../material/card/HeroCard';

type HeroRulesDialogContentProps = {
  game: GameView;
  rulesDialog: HeroRulesDialog;
  close: () => void;
};

const HeroRulesDialogContent: FC<HeroRulesDialogContentProps> = (props) => {
  const { game, rulesDialog, close } = props;
  const { hero } = rulesDialog;
  return (
    <CardRulesDialogContent
      game={game}
      card={hero}
      close={close}
      moveTypes={[MoveType.MoveHero]}
      cardRules={getCardRules(hero.id)}
      CardComponent={HeroCard}
    />
  );
};

const CARD_RULES = new Map<Hero, (card: Hero) => RuleDetail>();
CARD_RULES.set(Bonfur, () => ({
  header: 'hero.rules.header.bonfur',
  description: 'hero.rules.desc.bonfur',
}));
CARD_RULES.set(Aegur, () => ({
  header: 'hero.rules.header.aegur',
  description: 'hero.rules.desc.aegur',
}));

const getCardRules = (id: number) => {
  const card = Heroes[id];
  //TODO: replace with hero when all set
  return (CARD_RULES.get(card) ?? CARD_RULES.get(Bonfur)!)(Bonfur)!;
};

export { HeroRulesDialogContent };
