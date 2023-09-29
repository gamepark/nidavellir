import { isMoveItemType, ItemMove } from "@gamepark/rules-api"
import { LocationType } from "../../material/LocationType";
import { MaterialType } from "../../material/MaterialType";
import { dwarfTypes } from "../../cards/DwarfDescription";
import { Card } from "../../cards/Cards";
import { EffectRule } from "../effect/EffectRule";

export class BonfurRules extends EffectRule {

  getPlayerMoves() {
    const army = this.army
    const bonfur = this
      .material(MaterialType.Card)
      .id((id: Record<string, any>) => id.front === Card.Bonfur)
      .getItem()!

    return dwarfTypes
      .filter((type) => bonfur.location.id !== type)
      .flatMap((type) =>
        army
          .location((location) => location.id === type)
          .maxBy((item) => item.location.x!)
          .moveItems({ location: { type: LocationType.Discard, id: MaterialType.Card } })
      )
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.Card)(move) || move.position.location?.type !== LocationType.Discard) return []

    return this.end
  }

  get army() {
    return this.material(MaterialType.Card)
      .location(LocationType.Army)
      .player(this.player)
  }
}