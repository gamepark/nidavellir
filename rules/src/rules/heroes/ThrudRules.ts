import { MaterialType } from "../../material/MaterialType";
import { LocationType } from "../../material/LocationType";
import { dwarfTypes } from "../../cards/DwarfDescription";
import { Card } from "../../material/Card";
import { isMoveItemType, isStartPlayerTurn, ItemMove, PlayerTurnRule, RuleMove, RuleStep } from "@gamepark/rules-api"
import { CardChoice } from "../helpers/CardChoice";
import { Memory, PreviousRule } from "../Memory";
import { RuleId } from "../RuleId";

export class ThrudRules extends PlayerTurnRule {

  onRuleStart(_move: RuleMove, previousRule?: RuleStep) {
    if (!previousRule) return []
    if (previousRule.id === RuleId.RecruitHero) return [this.goBack]

    this.memorize<PreviousRule>(Memory.Thrud, previousRule)
    return []
  }

  getPlayerMoves() {
    const thrud = this.material(MaterialType.Card).id((id: Record<string, any>) => id.front === Card.Thrud)
    return dwarfTypes.map((type) => thrud.moveItem({ location: { type: LocationType.Army, x: type, player: this.player } }))
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.Card)(move)) return []
    const moves = new CardChoice(this.game, this.player).onMove(move)

    if (moves.some(((move) => isStartPlayerTurn(move) && move.id === RuleId.RecruitHero))) {
      this.memorize<PreviousRule>(Memory.PreviousRule, this.game.rule!)
      return moves;
    }

    moves.push(this.goBack)

    return moves;
  }


  get goBack() {
    const previousRule = this.remind<PreviousRule>(Memory.Thrud)
    return this.rules().startPlayerTurn(previousRule.id, previousRule.player!)
  }

  onRuleEnd() {
    this.forget(Memory.Thrud)
    return []
  }
}