import { MaterialMove, PlayerTurnRule } from "@gamepark/rules-api"
import PlayerTurn from "../helpers/PlayerTurn";
import { Effect, Memory } from "../Memory";

export abstract class EffectRule extends PlayerTurnRule {

  getPlayerMoves(): MaterialMove[] {
    return [];
  }

  get end(): MaterialMove[] {
    if (this.effect === this.game.rule?.id) this.forget(Memory.Effect)
    return this.nextRules
  }

  get nextRules(): MaterialMove[] {
    return new PlayerTurn(this.game, this.player).effectMoves
  }

  get effect() {
    return this.remind<Effect>(Memory.Effect)
  }
}