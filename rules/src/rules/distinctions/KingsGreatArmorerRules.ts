import { MaterialType } from "../../material/MaterialType";
import { Card } from "../../material/Card";
import { CardChoice } from "../helpers/CardChoice";
import { isMoveItemType, ItemMove, MaterialMove, RuleMove } from "@gamepark/rules-api"
import { DistinctionRules } from "./DistinctionRules";
import { LocationType } from "../../material/LocationType";


class KingsGreatArmorerRules extends DistinctionRules {

  onRuleStart(move: RuleMove): MaterialMove[] {
    const moves = super.onRuleStart(move);
    const cardChoice = new CardChoice(this.game, this.player!)

    const card = this
      .material(MaterialType.Card)
      .location(LocationType.DistinctionsDeck)
      .id((id) => (id as Record<string, any>).front === Card.BlacksmithDwarfKingsGreatArmorer)

    // If the player trigger recruitment effect, it can come back. In this case card.length is 0
    if (!card.length) return this.endDistinction

    moves.push(card.moveItem((item) => ({ location: cardChoice.getLocation(item.id.front) })))
    return moves;
  }

  afterItemMove(move: ItemMove): any[] {

    if (!isMoveItemType(MaterialType.Card)(move)) return []

    const player = this.player!
    const cardChoice = new CardChoice(this.game, player)
    return cardChoice.onMove(move)
  }
}

export { KingsGreatArmorerRules };
