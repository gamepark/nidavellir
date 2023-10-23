import { isMoveItemType, ItemMove, MaterialMove, MaterialRulesPart, RuleMove, RuleStep } from '@gamepark/rules-api'
import { Card } from '../cards/Cards'
import { LocationType } from '../material/LocationType'
import { MaterialType } from '../material/MaterialType'
import { TurnOrder } from './helpers/TurnOrder'
import { Memory } from './Memory'
import { RuleId } from './RuleId'

class BidRevelationRules extends MaterialRulesPart {

  onRuleStart(_move: RuleMove, previousRule?: RuleStep) {
    if (previousRule?.id !== RuleId.UlineBid) {
      this.nextTavern()
    }

    return this.coinsToReveal.rotateItems(true)
  }

  afterItemMove(move: ItemMove) {
    if (isMoveItemType(MaterialType.Coin)(move)) {
      const remainingCoins = this.coinsToReveal
      if (remainingCoins.length) return []
      const playerWithUline = this
        .material(MaterialType.Card)
        .location(LocationType.CommandZone)
        .id((id: Record<string, any>) => id.front === Card.Uline)
        .getItem()

      if (playerWithUline) {
        const tavernCoin = this
          .material(MaterialType.Coin)
          .location((location) => location.type === LocationType.PlayerBoard && location.id === this.tavern)
          .player(playerWithUline.location.player)

        if (!tavernCoin.length) return [this.rules().startPlayerTurn(RuleId.UlineBid, playerWithUline.location.player!)]
      }

      return this.moveToElvalandTurn
    }

    return []
  }

  get tavern() {
    return this.remind(Memory.Tavern)
  }

  nextTavern() {
    const tavern = this.tavern
    if (!tavern || tavern === 3) {
      this.memorize(Memory.Tavern, 1)
      return
    }

    this.memorize(Memory.Tavern, tavern + 1)
  }

  get moveToElvalandTurn(): MaterialMove[] {
    return [
      this.rules().startPlayerTurn(RuleId.ElvalandTurn, new TurnOrder(this.game).nextPlayer)
    ]
  }

  get coinsToReveal() {
    return this
      .material(MaterialType.Coin)
      .location(location => location.type === LocationType.PlayerBoard && location.id === this.tavern && !location.rotation)
  }
}

export { BidRevelationRules }
