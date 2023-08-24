import { isMoveItemType, ItemMove } from "@gamepark/rules-api"
import { LocationType } from "../../material/LocationType";
import HeroRules from "./HeroRules";
import { MaterialType } from "../../material/MaterialType";
import { dwarfTypes } from "../../cards/DwarfDescription";
import { Card } from "../../material/Card";

export class BonfurRules extends HeroRules {

  getPlayerMoves() {
    const army = this.army
    const bonfur = this
      .material(MaterialType.Card)
      .id((id: Record<string, any>) => id.front === Card.Bonfur)
      .getItem()!

    return dwarfTypes
      .filter((type) => bonfur.location.x !== type)
      .flatMap((type) =>
        army
          .location((location) => location.x === type)
          .maxBy((item) => item.location.y!)
          .moveItems({ location: { type: LocationType.Discard } })
      )
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.Card)(move) || move.position.location?.type !== LocationType.Discard) return []

    return [this.goBackToRecruitHeroRules]
  }

  get army() {
    return this.material(MaterialType.Card)
      .location(LocationType.Army)
      .player(this.player)
  }
}