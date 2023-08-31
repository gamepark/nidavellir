import { MaterialMove, MaterialRulesPart } from "@gamepark/rules-api";
import { Memory } from "../Memory";
import { RuleId } from "../RuleId";
import { MaterialType } from "../../material/MaterialType";
import { LocationType } from "../../material/LocationType";
import { TroopEvaluation } from "./TroopEvaluation";
import { Card } from "../../cards/Cards";
import { PlayerBoardSpace } from "../../material/PlayerBoardSpace";

export const MIN_DWARVES_PER_TAVERN = 3;
export class Tavern extends MaterialRulesPart {

  get end(): MaterialMove[] {
    if (this.isEndOfAge) {
      const startYlud = this.startYlud
      if (startYlud.length) return startYlud

      if (this.age === 2) {
        return this.moveThrudInCommandZone
      }

      return new TroopEvaluation(this.game).startEvaluation
    }

    for (const p of this.game.players) {
      this.forget(Memory.DiscardedCoin, p)
    }


    if (this.tavern < PlayerBoardSpace.ShiningHorse) {
      this.memorize(Memory.Tavern, (tavern) => tavern + 1)
      return [this.rules().startRule(RuleId.BidRevelation)]
    } else {
      this.memorize(Memory.Round, (round) => round + 1)
      return [this.rules().startRule(RuleId.EnterDwarves)]
    }
  }

  get startYlud() {
    const ylud = this
      .material(MaterialType.Card)
      .id((id: Record<string, any>) => id.front === Card.Ylud)
      .player((player) => player !== undefined)
      .getItem()

    if (ylud) return [this.rules().startPlayerTurn(RuleId.Ylud, ylud.location.player!)]
    return []
  }

  get moveThrudInCommandZone() {
    const thrud = this
      .material(MaterialType.Card)
      .id((id: Record<string, any>) => id.front === Card.Thrud)
      .player((player) => player !== undefined)

    if (!thrud.length) return []
    return thrud.moveItems((item) => ({ location: { type: LocationType.CommandZone, player: item.location.player }}))
  }

  get isEndOfAge() {
    const playerCount = this.game.players.length
    const cardInTaverns = this.material(MaterialType.Card).location(LocationType.Tavern)
    const round = this.round
    if (playerCount <= 3) {

      if (playerCount === 3) {
        return cardInTaverns.length === 0 && (this.age === 1 ? round === 4 : round === 8)
      } else {
        return cardInTaverns.length <= 1 && (this.age === 1 ? round === 4 : round === 8)
      }
    }

    return cardInTaverns.length === 0 && (this.age === 1 ? round === 3 : round === 6)
  }

  get age () {
    return this.remind(Memory.Age)
  }

  get round() {
    return this.remind(Memory.Round)
  }

  get tavern() {
    return this.remind(Memory.Tavern)
  }
}