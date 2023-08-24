import { isMoveItemType, ItemMove } from "@gamepark/rules-api"
import { Memory } from "../Memory";
import { LocationType } from "../../material/LocationType";
import HeroRules from "./HeroRules";
import { MaterialType } from "../../material/MaterialType";
import { dwarfTypes } from "../../cards/DwarfDescription";
import { Card } from "../../material/Card";

export class DagdaRules extends HeroRules {

  getPlayerMoves() {
    const army = this.army
    const dagda = this
      .material(MaterialType.Card)
      .id((id: Record<string, any>) => id.front === Card.Dagda)
      .getItem()!

    return dwarfTypes
      .filter((type) => this.lastDiscardColumn !== type && dagda.location.x !== type)
      .flatMap((type) =>
        army
          .location((location) => location.x === type)
          .maxBy((item) => item.location.y!)
          .moveItems({ location: { type: LocationType.Discard } })
      )
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.Card)(move) || move.position.location?.type !== LocationType.Discard) return []

    if (this.lastDiscardColumn !== undefined) {
      return [this.goBackToRecruitHeroRules]
    }

    this.memorize(Memory.Dagda, move.position.location.x)
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

  onRuleEnd() {
    this.forget(Memory.Dagda)
    return []
  }
}