import { EffectType } from './EffectType';
import EffectRules from './EffectRules';
import Move from '../moves/Move';
import MoveView from '../moves/MoveView';
import { isOnPlayerBoard } from '../utils/location.utils';
import { Gem6, Gems } from '../gems/Gems';
import { moveGemMove } from '../moves/MoveGem';
import { LocationType } from '../state/Location';

export type CrownJeweler = {
  type: EffectType.CROWN_JEWELER;
};

class CrownJewelerRules extends EffectRules {
  getAutomaticMoves(): (Move | MoveView)[] {
    const playerGem = this.game.gems.find((g) => isOnPlayerBoard(g.location) && g.location.player === this.player.id)!;
    const gem6 = this.game.gems.find((g) => Gems[g.id] === Gem6)!;
    return [
      moveGemMove(gem6.id, playerGem.location),
      moveGemMove(playerGem.id, { type: LocationType.Discard, index: 0 }),
    ];
  }
}

export { CrownJewelerRules };
