import { MaterialMove, MaterialRulesPart } from "@gamepark/rules-api";
import { Distinction, distinctions } from "../../material/Distinction";
import { Distinctions } from "../../cards/Distinctions";
import { RuleId } from "../RuleId";
import { DwarfType } from "../../cards/DwarfDescription";
import { PlayerId } from "../../state/Player";
import Army from "./Army";
import { MaterialType } from "../../material/MaterialType";
import { LocationType } from "../../material/LocationType";
import { Memory } from "../Memory";

export class TroopEvaluation extends MaterialRulesPart {

  get endDistinction(): MaterialMove[] {
    const remainingDistinctions = distinctions.slice(distinctions.indexOf(this.distinction) + 1)
    for (const d of remainingDistinctions) {
      const description = Distinctions[d]
      const playerWithMajority = this.getPlayerWithMajority(description.majorityOf)
      if (Distinction.PioneerOfTheKingdom === d) return [this.rules().startRule(DistinctionRuleId[d])]
      if (playerWithMajority) return [this.rules().startPlayerTurn(DistinctionRuleId[d], playerWithMajority)]
    }

    if (!this.material(MaterialType.Card).location(LocationType.Age1Deck).length) this.memorize(Memory.Age, 2)
    return [this.rules().startRule(RuleId.EnterDwarves)]
  }

  get startEvaluation() {
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
    const distinction = this.distinction
    const description = Distinctions[distinction]
    return this.getPlayerWithMajority(description.majorityOf)
  }

  get giveDistinctionToPlayer() {
    return this.material(MaterialType.Distinction).id(this.distinction).moveItems({ location: { type: LocationType.CommandZone, player: this.player } })
  }

  getPlayerWithMajority(type: DwarfType)  {
    let majority: number = 0
    let playersWithMajority: PlayerId[] = []
    for (const player of this.game.players) {
      const ranks = new Army(this.game, player).countGradesOfType(type)
      if (ranks > majority) {
        majority = ranks
        playersWithMajority = [player]
      } else if (ranks === majority) {
        playersWithMajority.push(player)
      }
    }

    if (playersWithMajority.length > 1) return undefined

    return playersWithMajority[0]
  }

}

const DistinctionRuleId = {
  [Distinction.KingsHand]: RuleId.KingsHand,
  [Distinction.HuntingMaster]: RuleId.HuntingMaster,
  [Distinction.CrownJeweler]: RuleId.CrownJeweler,
  [Distinction.KingsGreatArmorer]: RuleId.KingsGreatArmorer,
  [Distinction.PioneerOfTheKingdom]: RuleId.PioneerOfTheKingdom,
}