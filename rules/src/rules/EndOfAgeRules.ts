import { MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { Card } from '../cards/Cards'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { TroopEvaluation } from './helpers/TroopEvaluation'
import { Memory, PreviousRule } from './Memory'
import { RuleId } from './RuleId'

export class EndOfAgeRules extends MaterialRulesPart {

  onRuleStart(): MaterialMove[] {
    if (this.previousRule?.id === this.game.rule!.id) {
      this.forget(Memory.PreviousRule)
    }

    const startYlud = this.startYlud
    if (startYlud.length) {
      return startYlud
    }

    if (this.age === 2) {
      const thrud = this.moveThrudInCommandZone
      const moves = []
      if (thrud.length) {
        moves.push(...thrud)
      }

      moves.push(
        ...this
          .material(MaterialType.Coin)
          .location(location => (location.type === LocationType.Hand || location.type === LocationType.PlayerBoard) && !location.rotation)
          .rotateItems(true)
      )
      moves.push(this.rules().endGame())
      return moves
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

    if (!ylud) return []
    return [this.rules().startPlayerTurn(RuleId.Ylud, ylud.location.player!)]
  }

  get moveThrudInCommandZone() {
    const thrud = this
      .material(MaterialType.Card)
      .id((id: Record<string, any>) => id.front === Card.Thrud)
      .player((player) => player !== undefined)

    if (!thrud.length || thrud.location(LocationType.CommandZone).length) return []
    return thrud.moveItems(item => ({ type: LocationType.CommandZone, player: item.location.player }))
  }

  get previousRule() {
    return this.remind<PreviousRule>(Memory.PreviousRule)
  }
}