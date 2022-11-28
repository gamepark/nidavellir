import MoveType from './MoveType';

export type ChooseTavernCard = {
  type: MoveType.ChooseTavernCard;
  card: number;
};

export const chooseTavernCardMove = (card: number): ChooseTavernCard => ({
  type: MoveType.ChooseTavernCard,
  card,
});
