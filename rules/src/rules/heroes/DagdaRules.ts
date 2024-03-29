import { isMoveItemType, ItemMove, RuleMove } from '@gamepark/rules-api'
import { Card } from '../../cards/Cards'
import { dwarfTypes } from '../../cards/DwarfDescription'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { EffectRule } from '../effect/EffectRule'
import { Dagda, Memory } from '../Memory'

export class DagdaRules extends EffectRule {

  getPlayerMoves() {
    const army = this.army
    const dagda = this
      .material(MaterialType.Card)
      .id((id: Record<string, any>) => id.front === Card.Dagda)
      .getItem()!

    return dwarfTypes
      .filter((type) => this.lastDiscardColumn?.type !== type && dagda.location.id !== type)
      .flatMap((type) =>
        army
          .location((location) => location.id === type)
          .maxBy((item) => item.location.x!)
          .moveItems({ type: LocationType.Discard, id: MaterialType.Card })
      )
  }

  beforeItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.Card)(move) || move.location.type !== LocationType.Discard) return []
    const movedItem = this.material(MaterialType.Card).index(move.itemIndex).getItem()!

    if (!this.lastDiscardColumn) this.memorize<Dagda>(Memory.Dagda, { index: move.itemIndex, type: movedItem.location.id })
    return []
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.Card)(move) || move.location.type !== LocationType.Discard) return []

    const lastColumn = this.lastDiscardColumn
    if (lastColumn && lastColumn.index !== move.itemIndex) {
      return this.end
    }
    return []
  }

  get army() {
    return this.material(MaterialType.Card)
      .location(LocationType.Army)
      .player(this.player)
  }

  get lastDiscardColumn() {
    return this.remind<Dagda>(Memory.Dagda)
  }

  onRuleEnd(move: RuleMove) {
    this.forget(Memory.Dagda)
    return super.onRuleEnd(move)
  }
}