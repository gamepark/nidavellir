import { SecretCard } from '../../state/view/SecretCard';
import { LocatedCard } from '../../state/LocatedCard';
import { SecretCoin } from '../../state/view/SecretCoin';
import { LocatedGem } from '../../state/LocatedGem';

export const SET_RULES_DIALOG = 'SET_RULES_DIALOG';

export type SetRulesDialog = {
  type: typeof SET_RULES_DIALOG;
  rulesDialog?: RulesDialog;
};

export type RulesDialog =
  | AgeCardRulesDialog
  | HeroRulesDialog
  | DistinctionRulesDialog
  | CoinRulesDialog
  | GemRulesDialog;

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

export type GemRulesDialog = {
  type: RulesDialogType.Gem;
  gem: LocatedGem;
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

  Gem,
}

export const setRulesDialog = (rulesDialog?: RulesDialog): SetRulesDialog => ({ type: SET_RULES_DIALOG, rulesDialog });

export const ageCardRulesDialog = (card: SecretCard): AgeCardRulesDialog => ({ type: RulesDialogType.AgeCard, card });

export const heroRulesDialog = (hero: LocatedCard): HeroRulesDialog => ({ type: RulesDialogType.Hero, hero });

export const distinctionRulesDialog = (distinction: LocatedCard): DistinctionRulesDialog => ({
  type: RulesDialogType.Distinction,
  distinction,
});

export const coinRulesDialog = (coin: SecretCoin): CoinRulesDialog => ({ type: RulesDialogType.Coin, coin });

export const gemRulesDialog = (gem: LocatedGem): GemRulesDialog => ({
  type: RulesDialogType.Gem,
  gem,
});
