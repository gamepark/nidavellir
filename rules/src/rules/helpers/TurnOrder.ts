import { Material, MaterialGame, MaterialItem, MaterialRulesPart } from '@gamepark/rules-api'
import orderBy from 'lodash/orderBy'
import { MaterialType } from '../../material/MaterialType'
import { DiscardedCoin, Memory } from '../Memory'
import { Coins } from '../../coins/Coins'
import { LocationType } from '../../material/LocationType'
import { PlayerId } from '../../player/Player'
import { RuleId } from '../RuleId'

export class TurnOrder extends MaterialRulesPart {

  constructor(game: MaterialGame, readonly player?: PlayerId) {
    super(game)
  }

  get nextPlayer(): number {
    const turnOrder = this.turnOrder

    if (this.isLastPlayer || !this.player) {
      return turnOrder[0]
    }

    const activePlayerIndex = turnOrder.findIndex((id) => this.player === id)
    return turnOrder[activePlayerIndex + 1]
  }

  get isLastPlayer() {
    const turnOrder = this.turnOrder
    return this.player === turnOrder[turnOrder.length - 1]
  }

  get turnOrder() {
    const coins = this.tavernCoins

    const orderedCoins = orderBy(
      coins.getItems(),
      [
        (c) => this.getCoinValue(c),
        (c) => this.material(MaterialType.Gem).player(c.location.player).getItem()!.id,
      ],
      ['desc', 'desc'],
    )

    return orderedCoins.map((c) => c.location.player!)
  }

  get goToNextPlayerMoves() {
    return [this.rules().startPlayerTurn(RuleId.ChooseCard, this.nextPlayer)]
  }

  getCoinValue(coin: MaterialItem) {
    const discardedCoin = this.remind<DiscardedCoin>(Memory.DiscardedCoin, coin.location.player)
    if (!discardedCoin || discardedCoin.tavern !== this.tavern) return Coins[coin.id].value
    const item = this.material(MaterialType.Coin).getItem(discardedCoin.index)!
    return Coins[item.id].value
  }

  get tavernCoins(): Material {
    const tavern = this.tavern
    return this
      .material(MaterialType.Coin)
      .location((location) => location.type === LocationType.PlayerBoard && location.id === tavern)
  }

  get tavern() {
    return this.remind(Memory.Tavern)
  }
}