import { LocationType } from '../material/LocationType'
import { MaterialMove, MaterialRulesPart } from "@gamepark/rules-api";
import { MaterialType } from "../material/MaterialType";
import { RuleId } from "./RuleId";
import { MIN_DWARVES_PER_TAVERN } from "./helpers/Tavern";
import { taverns } from "../material/Tavern";
import { Memory } from "./Memory";
import { Card } from "../cards/Cards";


class EnterTheDwarvesRules extends MaterialRulesPart {
  onRuleStart(): MaterialMove[] {
    const moves = this.fillTavern
    for (const player of this.game.players) {
      moves.push(
        ...this.material(MaterialType.Coin)
          .player(player)
          .location((location) => LocationType.Hand !== location.type)
          .moveItems({ location: { type: LocationType.Hand, player } })
      )
    }

    moves.push(this.rules().startSimultaneousRule(RuleId.Bids, this.playersThatMustBid))
    return moves
  }

  get playersThatMustBid() {
    return this.game.players.filter((player) => {
      const uline = this
        .material(MaterialType.Card)
        .id((id: Record<string, any>) => id.front === Card.Uline)
        .player(player)

      return !uline.length
    })
  }

  get fillTavern(): MaterialMove[] {
    const cardsByTavern = Math.max(MIN_DWARVES_PER_TAVERN, this.game.players.length)
    const drawnCards = this.material(MaterialType.Card)
      .location((location) => this.age === 1? LocationType.Age1Deck === location.type: LocationType.Age2Deck === location.type)
      .sort(card => -card.location.x!)
      .limit(cardsByTavern * 3)
      .getIndexes()

    return taverns.flatMap((tavern) => this.material(MaterialType.Card)
      .indexes(drawnCards.splice(0, 3))
      .moveItems({ location: { type: LocationType.Tavern, id: tavern }})
    )
  }

  onRuleEnd() {
    this.memorize(Memory.Tavern, 1)
    return []
  }

  get age () {
    return this.remind(Memory.Age)
  }
}

export { EnterTheDwarvesRules }
