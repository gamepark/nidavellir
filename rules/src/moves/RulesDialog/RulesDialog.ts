
export const SET_RULES_DIALOG = 'SET_RULES_DIALOG'

export type SetRulesDialog = {
  type: typeof SET_RULES_DIALOG;
  rulesDialog?: RulesDialog;
};

export type RulesDialog =
  | AgeCardRulesDialog
  | HeroRulesDialog
  | DistinctionRulesDialog
  | CoinRulesDialog
  | GemRulesDialog
  | TavernRulesDialog;

export type AgeCardRulesDialog = {
  type: RulesDialogType.AgeCard;
  card: any;
};

export type HeroRulesDialog = {
  type: RulesDialogType.Hero;
  hero: any;
};

export type DistinctionRulesDialog = {
  type: RulesDialogType.Distinction;
  distinction: any;
};

export type GemRulesDialog = {
  type: RulesDialogType.Gem;
  gem: any;
};

export type TavernRulesDialog = {
  type: RulesDialogType.Tavern;
  tavern: number;
};

export type CoinRulesDialog = {
  type: RulesDialogType.Coin;
  coin: any;
};

export enum RulesDialogType {
  AgeCard = 1,
  Hero,
  Distinction,
  Coin,

  Gem,
  Tavern,
}

export const setRulesDialog = (rulesDialog?: RulesDialog): SetRulesDialog => ({ type: SET_RULES_DIALOG, rulesDialog })

export const ageCardRulesDialog = (card: any): AgeCardRulesDialog => ({ type: RulesDialogType.AgeCard, card })

export const heroRulesDialog = (hero: any): HeroRulesDialog => ({ type: RulesDialogType.Hero, hero })

export const distinctionRulesDialog = (distinction: any): DistinctionRulesDialog => ({
  type: RulesDialogType.Distinction,
  distinction
})

export const coinRulesDialog = (coin: any): CoinRulesDialog => ({ type: RulesDialogType.Coin, coin })

export const gemRulesDialog = (gem: any): GemRulesDialog => ({
  type: RulesDialogType.Gem,
  gem
})
export const tavernRulesDialog = (tavern: number): TavernRulesDialog => ({
  type: RulesDialogType.Tavern,
  tavern
})
