import { LocationType } from '../material/LocationType'
import { isMoveItemType, ItemMove, MaterialMove, MaterialRulesPart } from "@gamepark/rules-api";
import { Memory } from "./Memory";
import { MaterialType } from "../material/MaterialType";
import { Card } from "../material/Card";
import { RuleId } from "./RuleId";
import { Coins } from "../coins/Coins";

class BidRevelationRules extends MaterialRulesPart {

  onRuleStart() {
    return this.coinsToReveal.moveItems({ rotation: {} })
  }

  afterItemMove(move: ItemMove) {
    if (isMoveItemType(MaterialType.Coin)(move)) {
      const remainingCoins = this.coinsToReveal
      if (remainingCoins.length) return []
      const playerWithUline = this.material(MaterialType.Card).location(LocationType.CommandZone).filter((item) => item.id.front === Card.Uline).getItem()

      if (playerWithUline) {
        const tavernCoin = this
          .material(MaterialType.Coin)
          .location((location) => location.type === LocationType.Tavern && location.x === this.tavern)
          .player(playerWithUline.location.player)
          .length

        if (!tavernCoin) return [this.rules().startPlayerTurn(RuleId.UlineBid, playerWithUline.location.player!)]
      }

      return this.moveToElvalandTurn
    }

    return []
  }

  get tavern() {
    return this.remind(Memory.Tavern)
  }

  get moveToElvalandTurn(): MaterialMove[] {
    const nextPlayer = this
      .material(MaterialType.Coin)
      .location((location) => location.type === LocationType.PlayerBoard)
      .maxBy((item) => Coins[item.id.front].value)
      .getItem()

    if (!nextPlayer) {
      throw new Error("There is an error while searching the next player")
    }

    return [
      this.rules().startPlayerTurn(RuleId.ChooseCard, nextPlayer?.location.player!)
    ]
  }

  get coinsToReveal() {
    const tavern = this.remind(Memory.Tavern)
    return this
      .material(MaterialType.Coin)
      .location((location) => location.type === LocationType.PlayerBoard && location.x === tavern)
      .rotation((rotation) => rotation?.y === 1)
  }
}

export {BidRevelationRules}
