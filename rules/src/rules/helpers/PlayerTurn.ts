import { isMoveItemType, Location, Material, MaterialGame, MaterialItem, MaterialMove, MaterialRulesPart, MoveItem } from "@gamepark/rules-api";
import { DiscardedCoin, Effect, Memory, PreviousRule } from "../Memory";
import orderBy from "lodash/orderBy";
import { Coins } from "../../coins/Coins";
import { MaterialType } from "../../material/MaterialType";
import { LocationType } from "../../material/LocationType";
import { PlayerId } from "../../player/Player";
import { RuleId } from "../RuleId";
import { isExchangeCoin } from "../../utils/coin.utils";
import { Trade } from "./Trade";
import { Tavern } from "./Tavern";
import { Card, Cards, HeroesEffects, isDwarfDescription, isHero, isHeroDescription, isRoyalOfferingDescription } from "../../cards/Cards";
import { DwarfType } from "../../cards/DwarfType";
import Army from "./Army";

export default class PlayerTurn extends MaterialRulesPart {
  private heroCount: number


  constructor(game: MaterialGame, readonly player: PlayerId) {
    super(game)
    this.heroCount = this.material(MaterialType.Card).player(player).filter((item) => isHero(item.id.front)).length

  }

  get endOfTurnMoves(): MaterialMove[] {
    if (!this.isLastPlayer) return [this.rules().startPlayerTurn(RuleId.ChooseCard, this.nextPlayer)]

    // TODO : only discard at 2 player and if there is one card left...
    //const moves: MaterialMove[] = this.discardTavernMoves

    if (this.game.rule?.id !== RuleId.GemTrade && new Trade(this.game).exists) {
      return [this.rules().startRule(RuleId.GemTrade)]
    }

    return new Tavern(this.game).end
  }

  get effect() {
    return this.remind<Effect>(Memory.Effect)
  }

  get goToEffect() {
    if (!this.effect) return []
    return [this.rules().startPlayerTurn(this.effect, this.player)]
  }

  get hasRecruitment() {
    return this.remind(Memory.Recruitements)
  }

  get goToRecruitment() {
    if (!this.hasRecruitment) return []
    return [this.rules().startPlayerTurn(RuleId.RecruitHero, this.player)]
  }


  get nextPlayer(): number {
    const turnOrder = this.turnOrder

    if (this.isLastPlayer) {
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

  get tavernCoin() {
    const tavern = this.tavern
    const coins = this.material(MaterialType.Coin);
    const coin = coins
      .location((location: Location) => location.type === LocationType.PlayerBoard)
      .locationId(tavern)
      .player(this.player)
      .getItem()

    const discardedCoin = this.remind<DiscardedCoin>(Memory.DiscardedCoin, this.player)
    if (!coin && discardedCoin?.tavern === tavern) {
      return coins.index(discardedCoin.index).getItem()!
    }

    return coin!
  }

  get goToTradeCoin() {
    if (this.isTradeCoin) return []
    const coin = this.tavernCoin
    if (!isExchangeCoin(coin)) return []

    return [this.rules().startPlayerTurn(RuleId.TradeCoin, this.player)]
  }

  get isTradeCoin() {
    return this.game.rule!.id === RuleId.TradeCoin
  }

  get tavernCoins(): Material {
    const tavern = this.tavern
    return this
      .material(MaterialType.Coin)
      .location((location) => location.type === LocationType.PlayerBoard && location.id === tavern)
  }

  get goToNextRules() {
    const moves = []
    const goToRecruitement = this.goToRecruitment
    if (goToRecruitement.length) {
      moves.push(...goToRecruitement)
      return moves
    }

    const effectMoves = this.goToEffect
    if (effectMoves.length) {
      moves.push(...effectMoves)
      return moves;
    }

    if (this.previousRule) {
      moves.push(...this.moveToPreviousRule)
      return moves;
    }

    const goToTradeCoin = this.goToTradeCoin
    if (goToTradeCoin.length) {
      moves.push(...goToTradeCoin)
      return moves;
    }

    moves.push(...this.endOfTurnMoves)

    return moves;
  }

  get moveToPreviousRule() {
    if (!this.previousRule) return []
    const previousRule = this.previousRule;
    if (previousRule.id === this.ruleId || !previousRule?.player) return []
    return [this.rules().startPlayerTurn(previousRule.id, this.player)]
  }

  get ruleId() {
    return this.game.rule?.id
  }

  get previousRule () {
    return this.remind<PreviousRule>(Memory.PreviousRule)
  }


  onChooseCard(move: MoveItem) {
    const movedItem = this.material(MaterialType.Card).getItem(move.itemIndex)!

    this.applyEffect(movedItem)

    const yludMoves = this.mayMoveThrud(move)
    this.mayRecruitNewHeroes(move)

    if (yludMoves.length) {
      return yludMoves;
    }

    return this.goToNextRules
  }

  applyEffect (item: MaterialItem) {
    const cardId = item.id.front
    const description = Cards[cardId]

    if (isRoyalOfferingDescription(cardId, description)) {
      this.memorize(Memory.TransformBonus, description.bonus)
      this.memorize<Effect>(Memory.Effect, RuleId.TransformCoin)
    }

    if (isHeroDescription(cardId, description)) {
      const effect = HeroesEffects[cardId]
      if (effect) this.memorize<Effect>(Memory.Effect, HeroesEffects[cardId])
    }
  }

  mayRecruitNewHeroes(move: MaterialMove,) {
    const recruitHeroCount = this.computeRecruitHeroCount(move)
    if (recruitHeroCount > 0) {
      //const operation = (effect: Effect) => (!unshit ? player.effects.push(effect) : player.effects.unshift(effect))
      this.memorize(Memory.Recruitements, recruitHeroCount)
    }
  }

  mayMoveThrud(move: MaterialMove): MaterialMove[] {
    if (!isMoveItemType(MaterialType.Card)(move) || move.position.location?.type !== LocationType.Army) return []

    const thrud = new Army(this.game, this.player).getCard(Card.Thrud)
    if (!thrud.length || thrud.getIndex() === move.itemIndex) return []

    return [
      thrud.moveItem({ location: { type: LocationType.Hand, player: thrud.getItem()!.location.player } }),
      this.rules().startPlayerTurn(RuleId.Thrud, this.player)
    ]
  }

  computeRecruitHeroCount(move: MaterialMove): number {
    const army = new Army(this.game, this.player)
    if (!isMoveItemType(MaterialType.Card)(move) || move.position.location?.type !== LocationType.Army) return 0;
    const card = army.getItem(move.itemIndex)!
    const gradesByTypes = {
      [DwarfType.Blacksmith]: army.countGradesOfType(DwarfType.Blacksmith),
      [DwarfType.Hunter]: army.countGradesOfType(DwarfType.Hunter),
      [DwarfType.Warrior]: army.countGradesOfType(DwarfType.Warrior),
      [DwarfType.Explorer]: army.countGradesOfType(DwarfType.Explorer),
      [DwarfType.Miner]: army.countGradesOfType(DwarfType.Miner)
    }

    const minGradesBeforeCard = Math.min(
      gradesByTypes[DwarfType.Blacksmith] - army.getCardGradesCount(card, DwarfType.Blacksmith),
      gradesByTypes[DwarfType.Hunter] - army.getCardGradesCount(card, DwarfType.Hunter),
      gradesByTypes[DwarfType.Warrior] - army.getCardGradesCount(card, DwarfType.Warrior),
      gradesByTypes[DwarfType.Explorer] - army.getCardGradesCount(card, DwarfType.Explorer),
      gradesByTypes[DwarfType.Miner] - army.getCardGradesCount(card, DwarfType.Miner)
    )

    const minGradesAfterCard = Math.min(
      gradesByTypes[DwarfType.Blacksmith],
      gradesByTypes[DwarfType.Hunter],
      gradesByTypes[DwarfType.Warrior],
      gradesByTypes[DwarfType.Explorer],
      gradesByTypes[DwarfType.Miner]
    )

    const recruitmentCount = minGradesAfterCard - minGradesBeforeCard
    // It's not possible to recruit more hero than the number of completed row
    if (this.heroCount >= minGradesAfterCard) {
      return 0
    }

    return recruitmentCount
  }

  getCardLocation(card: Card): Location {
    const description = Cards[card]

    if (isHeroDescription(card, description) && description.type === DwarfType.Neutral) {
      return { type: LocationType.CommandZone, player: this.player }
    }

    if (isDwarfDescription(card, description) || isHeroDescription(card, description)) {
      return { type: LocationType.Army, id: description.type, player: this.player }
    }

    return { type: LocationType.Discard }
  }

}