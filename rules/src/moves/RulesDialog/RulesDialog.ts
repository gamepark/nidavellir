import { SecretCard } from '../../state/view/SecretCard';
import { LocatedCard } from '../../state/LocatedCard';
import { SecretCoin } from '../../state/view/SecretCoin';

export const SET_RULES_DIALOG = 'SET_RULES_DIALOG';

export type SetRulesDialog = {
  type: typeof SET_RULES_DIALOG;
  rulesDialog?: RulesDialog;
};

export type RulesDialog = AgeCardRulesDialog | HeroRulesDialog | DistinctionRulesDialog | CoinRulesDialog;

export type AgeCardRulesDialog = {
  type: RulesDialogType.AgeCard;
  card: SecretCard;
};

export type HeroRulesDialog = {
  type: RulesDialogType.Hero;
  hero: LocatedCard;
};

export type DistinctionRulesDialog = {
  type: RulesDialogType.Distinction;
  distinction: LocatedCard;
};

export type CoinRulesDialog = {
  type: RulesDialogType.Coin;
  coin: SecretCoin;
};

export enum RulesDialogType {
  AgeCard = 1,
  Hero,
  Distinction,
  Coin,
}

export function setRulesDialog(rulesDialog?: RulesDialog): SetRulesDialog {
  return { type: SET_RULES_DIALOG, rulesDialog };
}

export function ageCardRulesDialog(card: SecretCard): AgeCardRulesDialog {
  return { type: RulesDialogType.AgeCard, card };
}

export function heroRulesDialog(hero: LocatedCard): HeroRulesDialog {
  return { type: RulesDialogType.Hero, hero };
}

export function distinctionRulesDialog(distinction: LocatedCard): DistinctionRulesDialog {
  return { type: RulesDialogType.Distinction, distinction };
}

export function coinRulesDialog(coin: SecretCoin): CoinRulesDialog {
  return { type: RulesDialogType.Coin, coin };
}
