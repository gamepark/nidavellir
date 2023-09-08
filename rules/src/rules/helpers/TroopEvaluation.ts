import { MaterialMove, MaterialRulesPart } from "@gamepark/rules-api";
import { Distinction, distinctions } from "../../material/Distinction";
import { Distinctions } from "../../cards/Distinctions";
import { RuleId } from "../RuleId";
import { DwarfType } from "../../cards/DwarfType";
import Army from "./Army";
import { MaterialType } from "../../material/MaterialType";
import { LocationType } from "../../material/LocationType";
import { Memory } from "../Memory";

export class TroopEvaluation extends MaterialRulesPart {

  get endDistinction(): MaterialMove[] {
    this.forget(Memory.PreviousRule)
    const remainingDistinctions = distinctions.slice(distinctions.indexOf(this.distinction) + 1)
    for (const d of remainingDistinctions) {
      const description = Distinctions[d]
      const playerWithMajority = this.getPlayerWithMajority(description.majorityOf)
      if (playerWithMajority) return [this.rules().startPlayerTurn(DistinctionRuleId[d], playerWithMajority)]
      if (Distinction.PioneerOfTheKingdom === d) return [this.rules().startRule(DistinctionRuleId[d])]
    }

    this.forget(Memory.EndOfAge)
    this.forget(Memory.YludPlayed)
    return [this.rules().startRule(RuleId.EnterDwarves)]
  }

  get startEvaluation() {
    this.memorize(Memory.Age, 2)
    return this.endDistinction
  }

  get distinction() {
    switch (this.game.rule?.id) {
      case RuleId.HuntingMaster:
        return Distinction.HuntingMaster;
      case RuleId.CrownJeweler:
        return Distinction.CrownJeweler;
      case RuleId.KingsGreatArmorer:
        return Distinction.KingsGreatArmorer;
      case RuleId.PioneerOfTheKingdom:
        return Distinction.PioneerOfTheKingdom
      case RuleId.KingsHand:
        return Distinction.KingsHand;
      default:
        return 0
    }
  }

  get player() {
    return this.game.rule?.player
  }

  get giveDistinctionToPlayer() {
    return this.material(MaterialType.Distinction).id(this.distinction).moveItems({ location: { type: LocationType.CommandZone, player: this.player } })
  }

  getPlayerWithMajority(type: DwarfType)  {
    for (const player of this.game.players) {
      if (new Army(this.game, player).hasStrictMajorityOf(type)) {
        return player
      }
    }

    return undefined
  }
}

const DistinctionRuleId = {
  [Distinction.KingsHand]: RuleId.KingsHand,
  [Distinction.HuntingMaster]: RuleId.HuntingMaster,
  [Distinction.CrownJeweler]: RuleId.CrownJeweler,
  [Distinction.KingsGreatArmorer]: RuleId.KingsGreatArmorer,
  [Distinction.PioneerOfTheKingdom]: RuleId.PioneerOfTheKingdom,
}