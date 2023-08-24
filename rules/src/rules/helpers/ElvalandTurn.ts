import { Location, Material, MaterialGame, MaterialItem, MaterialMove, MaterialRulesPart } from "@gamepark/rules-api";
import { DiscardedCoin, Memory } from "../Memory";
import orderBy from "lodash/orderBy";
import { Coins } from "../../coins/Coins";
import { MaterialType } from "../../material/MaterialType";
import { LocationType } from "../../material/LocationType";
import { PlayerId } from "../../state/Player";
import { RuleId } from "../RuleId";
import { isExchangeCoin } from "../../utils/coin.utils";
import { Trade } from "./Trade";
import { Tavern } from "./Tavern";

export default class ElvalandTurn extends MaterialRulesPart {

  constructor(game: MaterialGame, readonly activePlayer: PlayerId) {
    super(game)
  }

  get endOfTurnMoves(): MaterialMove[] {
    if (!this.isLastPlayer) return [this.rules().startPlayerTurn(RuleId.ChooseCard, this.nextPlayer)]
    const moves: MaterialMove[] = this.discardTavernMoves

    if (this.game.rule?.id !== RuleId.GemTrade && new Trade(this.game).exists) {
      moves.push(this.rules().startRule(RuleId.GemTrade))
    } else {
      moves.push(...new Tavern(this.game).end)
    }

    return moves
  }


  get nextPlayer(): number {
    const turnOrder = this.turnOrder

    if (this.isLastPlayer) {
      return turnOrder[0]
    }

    const activePlayerIndex = turnOrder.findIndex((id) => this.activePlayer === id)
    return turnOrder[activePlayerIndex + 1]
  }

  get isLastPlayer() {
    const turnOrder = this.turnOrder
    return this.activePlayer === turnOrder[turnOrder.length - 1]
  }

  get turnOrder() {
    const coins = this.tavernCoins

    const orderedCoins = orderBy(
      coins.getItems(),
      [
        this.getCoinValue,
        (c) => {
          return this.material(MaterialType.Gem).player(c.location.player).getItem()
        }
      ],
      ['desc', 'desc']
    )

    return orderedCoins.map((c) => c.location.player!)
  }

  getCoinValue (coin: MaterialItem) {
    const discardedCoin = this.remind<DiscardedCoin>(Memory.DiscardedCoin, coin.location.player)
    if (!discardedCoin || discardedCoin.tavern !== this.tavern) return Coins[coin.id].value
    const item = this.material(MaterialType.Coin).index(discardedCoin.index).getItem()!
    return Coins[item.id].value
  }

  get tavern() {
    return this.remind(Memory.Tavern)
  }

  get discardTavernMoves () {
    const tavern = this.tavern
    return this
      .material(MaterialType.Card)
      .location((location) => location.type === LocationType.Tavern && location.x === tavern)
      .moveItems({ location: { type: LocationType.Discard }})
  }

  get tavernCoin() {
    const tavern = this.remind(Memory.Tavern)
    return this
      .material(MaterialType.Coin)
      .location((location: Location) => location.type === LocationType.Tavern && location.x === tavern)
      .player(this.activePlayer)
      .getItem()!
  }

  get moveToTradeCoin() {
    const coin = this.tavernCoin
    if (!isExchangeCoin(coin.id)) return []

    return [this.rules().startPlayerTurn(RuleId.TradeCoin, this.activePlayer)]
  }

  get tavernCoins(): Material {
    const tavern = this.tavern
    return this
      .material(MaterialType.Coin)
      .location((location) => location.type === LocationType.Tavern && location.x === tavern)
  }

}