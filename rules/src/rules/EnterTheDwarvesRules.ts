import { LocationType } from '../material/LocationType'
import { MaterialMove, MaterialRulesPart } from "@gamepark/rules-api";
import { MaterialType } from "../material/MaterialType";
import { RuleId } from "./RuleId";
import { MIN_DWARVES_PER_TAVERN } from "./helpers/Tavern";
import { TAVERN_COUNT } from "../utils/constants";


class EnterTheDwarvesRules extends MaterialRulesPart {
  onRuleStart(): MaterialMove[] {
    const moves = this.fillTavern
    for (const player of this.game.players) {
      moves.push(
        ...this.material(MaterialType.Coin)
          .player(player)
          .location((location) => LocationType.PlayerHand !== location.type)
          .moveItems({ location: { type: LocationType.PlayerHand, player } })
      )
    }

    moves.push(this.rules().startRule(RuleId.Bids))
    return moves
  }

  get fillTavern(): MaterialMove[] {
    const cardsByTavern = Math.max(MIN_DWARVES_PER_TAVERN, this.game.players.length)
    const numberOfCard = cardsByTavern * TAVERN_COUNT

    return this.material(MaterialType.Card)
      .location((location) => LocationType.Age1Deck === location.type || LocationType.Age2Deck === location.type)
      .sort(card => -card.location.x!)
      .limit(numberOfCard)
      .moveItems({ location: { type: LocationType.Tavern }})
  }
}

export { EnterTheDwarvesRules }
