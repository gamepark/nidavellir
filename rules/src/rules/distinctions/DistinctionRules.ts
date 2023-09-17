import { MaterialGame, MaterialMove, RuleMove, RuleStep } from '@gamepark/rules-api'
import { TroopEvaluation } from '../helpers/TroopEvaluation'
import { Memory, PreviousRule } from '../Memory'
import { PlayerId } from '../../player/Player'

export class DistinctionRules extends TroopEvaluation {

  constructor(game: MaterialGame) {
    super(game)
  }

  onRuleStart(_move: RuleMove, _previousRule?: RuleStep): MaterialMove[] {
    const ruleId = this.ruleId
    const previous = this.previousRule
    if (previous && previous.id === ruleId) {
      this.forget(Memory.PreviousRule)
      return []
    }

    const player = this.player

    if (player) {
      return this.giveDistinctionToPlayer
    }

    return []
  }

  get ruleId() {
    return this.game.rule!.id
  }

  get previousRule() {
    return this.remind<PreviousRule>(Memory.PreviousRule)
  }

  memorizeRule(player: PlayerId) {
    this.memorize<PreviousRule>(Memory.PreviousRule, { id: this.game.rule!.id, player })
  }
}