import MoveType from './MoveType'
import { CardLocation } from '../state/LocatedCard'
import { PlayerId } from '../state/Player'

export type MoveHero = {
  type: MoveType.MoveHero;
  player: PlayerId
  id: number;
  target: CardLocation;

  source?: CardLocation;
};

export const moveHeroMove = (id: number, target: CardLocation, player: PlayerId): MoveHero => ({
  type: MoveType.MoveHero,
  id,
  target,
  player
})
