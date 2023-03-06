/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
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
import Images from '../images/Images';
import { Trans } from 'react-i18next';

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

const iconStyle = (icon: any) => css`
  width: 1em;
  height: 1em;
  margin-right: 2em;
  background-image: url(${icon});
  background-size: cover;
  margin-left: 0.2em;
`;

const headerStyle = css`
  margin-right: 0.5em;
`;

const divider = css`
  width: 20%;
  border-bottom: 0.1em solid rgba(0, 0, 0, 0.5);
`;

const CARD_RULES = new Map<Distinction, (card: Distinction) => RuleDetail>();
CARD_RULES.set(KingsHand, () => ({
  header: (
    <Trans
      defaults="distinction.rules.header.kings-hand"
      components={[<strong css={headerStyle} />, <div css={iconStyle(Images.WarriorIcon)} />]}
    />
  ),
  description: [
    <Trans defaults="distinction.rules.desc.kings-hand" components={[<strong />]} />,
    <div css={divider} />,
    <Trans defaults="effect.transform-coin" components={[<strong />]} value={{ additionalValue: 5 }} />,
  ],
}));
CARD_RULES.set(HuntingMaster, () => ({
  header: (
    <Trans
      defaults="distinction.rules.header.hunting-master"
      components={[<strong css={headerStyle} />, <div css={iconStyle(Images.HunterIcon)} />]}
    />
  ),
  description: [<Trans defaults="distinction.rules.desc.hunting-master" components={[<strong />]} />],
}));
CARD_RULES.set(CrownJeweler, () => ({
  header: (
    <Trans
      defaults="distinction.rules.header.crown-jeweler"
      components={[<strong css={headerStyle} />, <div css={iconStyle(Images.MinerIcon)} />]}
    />
  ),
  description: [<Trans defaults="distinction.rules.desc.crown-jeweler" components={[<strong />]} />],
}));
CARD_RULES.set(KingsGreatArmorer, () => ({
  header: (
    <Trans
      defaults="distinction.rules.header.kings-great-armorer"
      components={[<strong css={headerStyle} />, <div css={iconStyle(Images.BlacksmithIcon)} />]}
    />
  ),
  description: [<Trans defaults="distinction.rules.desc.kings-great-armorer" components={[<strong />]} />],
}));
CARD_RULES.set(PioneerOfTheKingdom, () => ({
  header: (
    <Trans
      defaults="distinction.rules.header.pioneer-of-the-kingdom"
      components={[<strong css={headerStyle} />, <div css={iconStyle(Images.ExplorerIcon)} />]}
    />
  ),
  description: [
    <Trans defaults="distinction.rules.desc.pioneer-of-the-kingdom" components={[<strong />]} />,
    <div css={divider} />,
    <Trans defaults="effect.transform-coin" components={[<strong />]} values={{ additionalValue: 5 }} />,
  ],
}));

const getCardRules = (id: number) => {
  const card = Distinctions[id];
  return CARD_RULES.get(card)!(card)!;
};

export { DistinctionRulesDialogContent };
