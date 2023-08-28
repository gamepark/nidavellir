import { MaterialType } from "../../material/MaterialType";
import { LocationType } from "../../material/LocationType";
import { dwarfTypes } from "../../cards/DwarfDescription";
import { Card } from "../../cards/Cards";
import { isMoveItemType, ItemMove, PlayerTurnRule } from "@gamepark/rules-api"
import PlayerTurn from "../helpers/PlayerTurn";

export class ThrudRules extends PlayerTurnRule {

  getPlayerMoves() {
    const thrud = this.material(MaterialType.Card).id((id: Record<string, any>) => id.front === Card.Thrud)
    return dwarfTypes.map((type) => thrud.moveItem({ location: { type: LocationType.Army, id: type, player: this.player } }))
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.Card)(move)) return []
    return new PlayerTurn(this.game, this.player).onChooseCard(move)
  }
}