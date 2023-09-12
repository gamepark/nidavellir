import { MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { RuleId } from './RuleId'
import { MaterialType } from '../material/MaterialType'
import { LocationType } from '../material/LocationType'
import { Memory, PreviousRule } from './Memory'
import { Card } from '../cards/Cards'
import { TroopEvaluation } from './helpers/TroopEvaluation'

export class EndOfAgeRules extends MaterialRulesPart {

  onRuleStart(): MaterialMove[] {

    for (const p of this.game.players) {
      this.forget(Memory.DiscardedCoin, p)
    }

    const startYlud = this.startYlud
    if (startYlud.length) {
      return startYlud
    }

    if (this.age === 2) {
      const thrud = this.moveThrudInCommandZone
      if (thrud.length) {
        return thrud
      }

      return [this.rules().endGame()]
    }


    return new TroopEvaluation(this.game).startEvaluation
  }

  get age() {
    return this.remind(Memory.Age)
  }

  get startYlud() {
    if (this.remind(Memory.YludPlayed)) return []
    const ylud = this
      .material(MaterialType.Card)
      .id((id: Record<string, any>) => id.front === Card.Ylud)
      .player((player) => player !== undefined)
      .getItem()

    this.memorize<PreviousRule>(Memory.PreviousRule, this.game.rule!)
    if (ylud) return [this.rules().startPlayerTurn(RuleId.Ylud, ylud.location.player!)]
    return []
  }

  get moveThrudInCommandZone() {
    const thrud = this
      .material(MaterialType.Card)
      .id((id: Record<string, any>) => id.front === Card.Thrud)
      .player((player) => player !== undefined)

    if (!thrud.length || thrud.location(LocationType.CommandZone).length) return []
    return thrud.moveItems((item) => ({ location: { type: LocationType.CommandZone, player: item.location.player } }))
  }
}