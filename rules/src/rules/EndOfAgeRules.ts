import { MaterialMove, MaterialRulesPart } from '@gamepark/rules-api'
import { RuleId } from './RuleId'
import { MaterialType } from '../material/MaterialType'
import { LocationType } from '../material/LocationType'
import { Memory, PreviousRule } from './Memory'
import { Card } from '../cards/Cards'
import { TroopEvaluation } from './helpers/TroopEvaluation'

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
          .location(({ type }) => type === LocationType.Hand || type === LocationType.PlayerBoard)
          .rotation((rotation) => !rotation?.y)
          .moveItems({ rotation: { y: 1 }})
      )
      moves.push(this.rules().endGame())
      return moves;
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
    return thrud.moveItems((item) => ({ location: { type: LocationType.CommandZone, player: item.location.player } }))
  }

  get previousRule() {
    return this.remind<PreviousRule>(Memory.PreviousRule)
  }
}