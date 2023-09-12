import { isMoveItemType, Location, MaterialGame, MaterialItem, MaterialMove, MaterialRulesPart, MoveItem } from '@gamepark/rules-api'
import { Effect, Memory, PreviousRule } from '../Memory'
import { MaterialType } from '../../material/MaterialType'
import { LocationType } from '../../material/LocationType'
import { PlayerId } from '../../player/Player'
import { RuleId } from '../RuleId'
import { Trade } from './Trade'
import { Tavern } from './Tavern'
import { Card, Cards, HeroesEffects, isDwarfDescription, isHero, isHeroDescription, isRoyalOfferingDescription } from '../../cards/Cards'
import { DwarfType, dwarfTypes } from '../../cards/DwarfType'
import Army from './Army'
import { TurnOrder } from './TurnOrder'
import { getTypes } from '../../cards/DwarfDescription'

export default class PlayerTurn extends MaterialRulesPart {
  private heroCount: number


  constructor(game: MaterialGame, readonly player: PlayerId) {
    super(game)
    this.heroCount = this.material(MaterialType.Card).player(player).filter((item) => isHero(item.id.front)).length

  }

  get endOfTurnMoves(): MaterialMove[] {
    const turnOrder = new TurnOrder(this.game, this.player)
    if (!turnOrder.isLastPlayer) return turnOrder.goToNextPlayerMoves

    const moves: MaterialMove[] = this.discardTavernMoves
    const trade = new Trade(this.game)
    if (this.game.rule?.id !== RuleId.GemTrade && trade.exists) {
      moves.push(...trade.goToGemExchangeMoves)
      return moves
    }

    moves.push(...new Tavern(this.game).end)
    return moves
  }

  get discardTavernMoves () {
    const cards = this
      .material(MaterialType.Card)
      .location(LocationType.Tavern)
      .locationId(this.tavern)
    if (!cards.length) return []

    return cards.moveItems({ location: { type: LocationType.Discard }})
  }

  get effect() {
    return this.remind<Effect>(Memory.Effect)
  }

  get goToEffect() {
    if (!this.effect) return []
    return [this.rules().startPlayerTurn(this.effect, this.player)]
  }

  get hasRecruitment() {
    return this.remind(Memory.Recruitments)
  }

  get goToRecruitment() {
    if (!this.hasRecruitment) return []
    return [this.rules().startPlayerTurn(RuleId.RecruitHero, this.player)]
  }

  get tavern() {
    return this.remind(Memory.Tavern)
  }

  get nextRules() {
    const moves = []
    const goToRecruitment = this.goToRecruitment
    if (goToRecruitment.length) {
      moves.push(...goToRecruitment)
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

    return [this.rules().startPlayerTurn(RuleId.EndOfTurn, this.player)];
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

    if (this.game.players.length === 2
      && !this.material(MaterialType.Card).location(LocationType.Tavern).locationId(this.tavern).length
    && move.position.location?.type === LocationType.Discard) return []

    this.applyEffect(movedItem)

    const thrudMoves = this.mayMoveThrud(move)
    this.mayRecruitNewHeroes(move)

    if (thrudMoves.length) {
      return thrudMoves;
    }

    return this.nextRules
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
      this.memorize(Memory.Recruitments, recruitHeroCount)
    }
  }

  mayMoveThrud(move: MaterialMove): MaterialMove[] {
    if (!isMoveItemType(MaterialType.Card)(move) || move.position.location?.type !== LocationType.Army) return []

    const thrud = new Army(this.game, this.player).getCard(Card.Thrud)
    if (!thrud.length
      || thrud.getIndex() === move.itemIndex
      || thrud.getItem()?.location?.id !== move.position.location.id) return []

    return [
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

  getCardLocations(card: Card): Location[] {
    const description = Cards[card]

    if (card === Card.Thrud) {
      return dwarfTypes.map((type) => ({ type: LocationType.Army, id: type, player: this.player }))
    }

    if (isHeroDescription(card, description) && getTypes(description).includes(DwarfType.Neutral)) {
      return [{ type: LocationType.CommandZone, player: this.player }]
    }

    if (isDwarfDescription(card, description) || isHeroDescription(card, description)) {
      return getTypes(description).map((type) => ({ type: LocationType.Army, id: type, player: this.player }))
    }

    return [{ type: LocationType.Discard }]
  }

}