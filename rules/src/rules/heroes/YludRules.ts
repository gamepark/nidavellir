import { MaterialType } from "../../material/MaterialType";
import { isMoveItemType, ItemMove, MaterialMove } from "@gamepark/rules-api"
import { Card } from "../../cards/Cards";
import { LocationType } from "../../material/LocationType";
import { dwarfTypes } from "../../cards/DwarfDescription";
import PlayerTurn from "../helpers/PlayerTurn";
import { EffectRule } from "../effect/EffectRule";
import { Memory } from '../Memory'

export class YludRules extends EffectRule {

  getPlayerMoves(): MaterialMove[] {
    const ylud = this.ylud
    return dwarfTypes.map((type) => ylud.moveItem({ location: { type: LocationType.Army, id: type, player: this.player } }))
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.Card)(move)) return []
    this.memorize(Memory.YludPlayed, true)
    return new PlayerTurn(this.game, this.player).onChooseCard(move)
  }

  get ylud() {
    return this
      .material(MaterialType.Card)
      .player(this.player)
      .id((id: Record<string, any>) => id.front === Card.Ylud)
  }
}