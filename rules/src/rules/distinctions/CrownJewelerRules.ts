import { LocationType } from '../../material/LocationType'
import { DistinctionRules } from "./DistinctionRules";
import { MaterialType } from "../../material/MaterialType";
import { Gem } from "../../material/Gem";
import { RuleMove } from "@gamepark/rules-api";

class CrownJewelerRules extends DistinctionRules {
  onRuleStart(move: RuleMove) {
    const moves = super.onRuleStart(move)
    const existingGem = this.material(MaterialType.Gem).player(this.player);
    moves.push(
      existingGem.moveItem({ location: { type: LocationType.Discard } }),
      this.material(MaterialType.Gem).id(Gem.Gem6).moveItem({ location: existingGem.getItem()!.location }),
      ...this.endDistinction
    )

    return moves;
  }
}

export { CrownJewelerRules }
