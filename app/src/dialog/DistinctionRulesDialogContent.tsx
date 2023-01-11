import GameView from '@gamepark/nidavellir/state/view/GameView';
import { FC } from 'react';
import { CardRulesDialogContent, RuleDetail } from './CardRulesDialogContent';
import { Distinction } from '@gamepark/nidavellir/cards/Distinction';
import {
  CrownJeweler,
  Distinctions,
  HuntingMaster,
  KingsGreatArmorer,
  KingsHand,
  PioneerOfTheKingdom,
} from '@gamepark/nidavellir/cards/Distinctions';
import { DistinctionRulesDialog } from '@gamepark/nidavellir/moves/RulesDialog/RulesDialog';
import { DistinctionCard } from '../material/card/DistinctionCard';

type DistinctionRulesDialogContentProps = {
  game: GameView;
  rulesDialog: DistinctionRulesDialog;
  close: () => void;
};

const DistinctionRulesDialogContent: FC<DistinctionRulesDialogContentProps> = (props) => {
  const { game, rulesDialog, close } = props;
  const { distinction } = rulesDialog;
  return (
    <CardRulesDialogContent
      game={game}
      card={distinction}
      close={close}
      cardRules={getCardRules(distinction.id)}
      CardComponent={DistinctionCard}
    />
  );
};

const CARD_RULES = new Map<Distinction, (card: Distinction) => RuleDetail>();
CARD_RULES.set(KingsHand, () => ({
  header: 'distinction.rules.header.kings-hand',
  description: ['distinction.rules.desc.kings-hand'],
}));
CARD_RULES.set(HuntingMaster, () => ({
  header: 'distinction.rules.header.hunting-master',
  description: ['distinction.rules.desc.hunting-master'],
}));
CARD_RULES.set(CrownJeweler, () => ({
  header: 'distinction.rules.header.crown-jeweler',
  description: ['distinction.rules.desc.crown-jeweler'],
}));
CARD_RULES.set(KingsGreatArmorer, () => ({
  header: 'distinction.rules.header.kings-great-armorer',
  description: ['distinction.rules.desc.kings-great-armorer'],
}));
CARD_RULES.set(PioneerOfTheKingdom, () => ({
  header: 'distinction.rules.header.pioneer-of-the-kingdom',
  description: ['distinction.rules.desc.pioneer-of-the-kingdom'],
}));

const getCardRules = (id: number) => {
  const card = Distinctions[id];
  return CARD_RULES.get(card)!(card)!;
};

export { DistinctionRulesDialogContent };
