import { MaterialMove, PlayerTurnRule } from "@gamepark/rules-api"
import { RuleId } from "../RuleId";

export default class HeroRules extends PlayerTurnRule {
    getPlayerMoves(): MaterialMove[] {
      return [];
    }

    get goBackToRecruitHeroRules() {
      return this.rules().startPlayerTurn(RuleId.RecruitHero, this.player)
    }
}