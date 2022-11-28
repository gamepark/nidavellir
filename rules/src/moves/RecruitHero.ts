import MoveType from './MoveType';

export type RecruitHero = {
  type: MoveType.RecruitHero;
  card: number;
};

export const recruitHeroMove = (card: number): RecruitHero => ({
  type: MoveType.RecruitHero,
  card,
});
