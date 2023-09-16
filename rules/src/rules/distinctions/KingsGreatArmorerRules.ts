import { MaterialType } from "../../material/MaterialType";
import { isMoveItemType, ItemMove, MaterialMove, RuleMove } from "@gamepark/rules-api"
import { DistinctionRules } from "./DistinctionRules";
import { LocationType } from "../../material/LocationType";
import { Card } from "../../cards/Cards";
import PlayerTurn from "../helpers/PlayerTurn";


class KingsGreatArmorerRules extends DistinctionRules {

  onRuleStart(move: RuleMove): MaterialMove[] {
    const moves = super.onRuleStart(move);
    const playerTurn = new PlayerTurn(this.game, this.player!)

    const card = this
      .material(MaterialType.Card)
      .location(LocationType.DistinctionsDeck)
      .id((id) => (id as Record<string, any>).front === Card.BlacksmithKingsGreatArmorer)

    // If the player trigger recruitment effect, it can come back. In this case card.length is 0
    if (!card.length) return this.endDistinction

    const locations = playerTurn.getCardLocations(card.getItem()!.id.front)
    for (const location of locations) {
      moves.push(card.moveItem({ location }))
    }
    return moves;
  }

  afterItemMove(move: ItemMove): any[] {
    if (!isMoveItemType(MaterialType.Card)(move)) return []

    const moves = new PlayerTurn(this.game, this.player!).onChooseCard(move)
    if (!moves.length) {
      return this.endDistinction
    }

    this.memorizeRule(this.player!)
    return moves;
  }
}

export { KingsGreatArmorerRules };
