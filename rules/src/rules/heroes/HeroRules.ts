import { MaterialMove, PlayerTurnRule, RuleMove, RuleStep } from "@gamepark/rules-api"
import { RuleId } from "../RuleId";
import { Effect, Memory } from "../Memory";

export default class HeroRules extends PlayerTurnRule {

  onRuleStart(_move: RuleMove<number, RuleId>, previousRule?: RuleStep) {
    if (previousRule?.id === RuleId.Thrud) return [this.goBackToRecruitHeroRules]
    return []
  }

  getPlayerMoves(): MaterialMove[] {
    return [];
  }

  get goBackToRecruitHeroRules() {
    return this.rules().startPlayerTurn(RuleId.RecruitHero, this.player)
  }

  onRuleEnd(_move: RuleMove) {
    if (this.remind<Effect>(Memory.Effect) === this.game.rule?.id) this.forget(Memory.Effect)
    return super.onRuleEnd(_move);
  }
}