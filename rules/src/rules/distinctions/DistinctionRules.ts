import { MaterialGame, MaterialMove, RuleMove } from "@gamepark/rules-api";
import { TroopEvaluation } from "../helpers/TroopEvaluation";

export class DistinctionRules extends TroopEvaluation {

  constructor(game: MaterialGame) {
    super(game);
  }

  onRuleStart(_move: RuleMove): MaterialMove[] {
    const player = this.player

    if (player) {
      return this.giveDistinctionToPlayer
    }

    return []
  }
}