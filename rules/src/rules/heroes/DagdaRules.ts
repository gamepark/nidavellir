import { isMoveItemType, ItemMove, RuleMove } from "@gamepark/rules-api"
import { Memory } from "../Memory";
import { LocationType } from "../../material/LocationType";
import { MaterialType } from "../../material/MaterialType";
import { dwarfTypes } from "../../cards/DwarfDescription";
import { Card } from "../../cards/Cards";
import { EffectRule } from "../effect/EffectRule";

export class DagdaRules extends EffectRule {

  getPlayerMoves() {
    const army = this.army
    const dagda = this
      .material(MaterialType.Card)
      .id((id: Record<string, any>) => id.front === Card.Dagda)
      .getItem()!

    return dwarfTypes
      .filter((type) => this.lastDiscardColumn !== type && dagda.location.id !== type)
      .flatMap((type) =>
        army
          .location((location) => location.id === type)
          .maxBy((item) => item.location.x!)
          .moveItems({ location: { type: LocationType.Discard } })
      )
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.Card)(move) || move.position.location?.type !== LocationType.Discard) return []

    if (this.lastDiscardColumn !== undefined) {
      return this.end
    }

    this.memorize(Memory.Dagda, move.position.location.id)
    return []
  }

  get army() {
    return this.material(MaterialType.Card)
      .location(LocationType.Army)
      .player(this.player)
  }

  get lastDiscardColumn() {
    return this.remind(Memory.Dagda)
  }

  onRuleEnd(move: RuleMove) {
    this.forget(Memory.Dagda)
    return super.onRuleEnd(move)
  }
}