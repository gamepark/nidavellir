import { MaterialType } from "../../material/MaterialType";
import HeroRules from "./HeroRules";
import { Memory, PreviousRule } from "../Memory";
import { CardChoice } from "../helpers/CardChoice";
import { isMoveItemType, isStartPlayerTurn, ItemMove, MaterialMove } from "@gamepark/rules-api"
import { Tavern } from "../helpers/Tavern";
import { Card } from "../../material/Card";
import { LocationType } from "../../material/LocationType";
import { dwarfTypes } from "../../cards/DwarfDescription";
import { RuleId } from "../RuleId";
import { TroopEvaluation } from "../helpers/TroopEvaluation";

export class YludRules extends HeroRules {

  getPlayerMoves(): MaterialMove[] {
    const ylud = this.ylud
    return dwarfTypes.map((type) => ylud.moveItem({ location: { type: LocationType.Army, x: type, player: this.player } }))
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.Card)(move)) return []
    const moves = new CardChoice(this.game, this.player).onMove(move)

    if (moves.some(((move) => isStartPlayerTurn(move) && move.id === RuleId.RecruitHero))) {
      this.memorize<PreviousRule>(Memory.PreviousRule, this.game.rule!)
      return moves;
    }

    const tavern = new Tavern(this.game)

    if (tavern.age === 1) {
      moves.push(...new TroopEvaluation(this.game).startEvaluation)
      return moves
    }

    moves.push(...this.moveThrudInCommandZone)

    return moves;
  }

  get ylud() {
    return this
      .material(MaterialType.Card)
      .player(this.player)
      .id((id: Record<string, any>) => id.front === Card.Ylud)
  }

  get moveThrudInCommandZone() {
    const thrud = this
      .material(MaterialType.Card)
      .id((id: Record<string, any>) => id.front === Card.Thrud)
      .player((player) => player !== undefined)

    if (!thrud.length) return []
    return thrud.moveItems((item) => ({ location: { type: LocationType.CommandZone, player: item.location.player }}))
  }

  get isInCommandZone() {
    return this.ylud.getItem()!.location.type === LocationType.CommandZone
  }
}