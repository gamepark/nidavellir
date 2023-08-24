import { isMoveItemType, isStartPlayerTurn, ItemMove, MaterialItem, RuleMove, RuleStep } from "@gamepark/rules-api";
import { MaterialType } from "../material/MaterialType";
import { LocationType } from "../material/LocationType";
import { isHero } from "../material/Card";
import { Effect, Memory } from "./Memory";
import { HeroWithActionRuleIds, RuleId } from "./RuleId";
import ElvalandTurn from "./helpers/ElvalandTurn";
import { CardChoice } from "./helpers/CardChoice";
import { EffectRule } from "./effect/EffectRule";
import Army from "./helpers/Army";
import { Cards } from "../cards/Cards";
import { HeroDescription } from "../cards/HeroDescription";

class RecruitHeroRules extends EffectRule {

  onRuleStart(_move: RuleMove, previousRule?: RuleStep) {
    if (previousRule && HeroWithActionRuleIds.includes(previousRule.id) && !this.hasRecruitement) return this.endOfHeroResolution
    if (this.effect) return [this.goToEffect]
    return []
  }

  onRuleEnd(_move: RuleMove<number, RuleId>) {
    this.forget(Memory.PreviousRule)
    return []
  }

  getPlayerMoves() {
    const chooseCard = new CardChoice(this.game, this.player)
    return this
      .material(MaterialType.Card)
      .location(LocationType.HeroesDeck)
      .filter(this.isRecruitable)
      .moveItems((item) => ({ location: chooseCard.getLocation(item.id.front) }))
  }

  beforeItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.Card)(move)) return []

    const movedItem = this.material(MaterialType.Card).getItem(move.itemIndex)!
    if (isHero(movedItem.id.front) && movedItem.location.type !== LocationType.Army) {
      const recruitements = this.remind(Memory.Recruitements)
      if (recruitements === 1) {
        this.forget(Memory.Recruitements)
      } else {
        this.memorize(Memory.Recruitements, recruitements - 1)
      }
    }

    return []
  }

  isRecruitable (item: MaterialItem): boolean {
    const id = item.id.front
    const description = Cards[id] as HeroDescription
    if (!description.minGrades) return true;

    return new Army(this.game, this.player).countGradesOfType(description.type) >= description.minGrades
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.Card)(move)) return []

    const chooseCard = new CardChoice(this.game, this.player)
    const moves = chooseCard.onMove(move)

    if (moves.some((move) => isStartPlayerTurn(move))) {
      return moves;
    }

    if (this.effect) {
      moves.push(this.goToEffect)
    }

    if (this.hasRecruitement) return moves;

    moves.push(...this.endOfHeroResolution)
    return moves;
  }

  get endOfHeroResolution() {
    const moves = []
    const moveToPrevious = this.moveToPreviousRule
    if (moveToPrevious.length) {
      moves.push(...moveToPrevious)
      return moves;
    }

    const elvalandTurn = new ElvalandTurn(this.game, this.player)
    const tradeCoin = elvalandTurn.moveToTradeCoin
    if (tradeCoin.length) {
      moves.push(...tradeCoin)
    } else {
      moves.push(...elvalandTurn.endOfTurnMoves)
    }

    return moves
  }

  get effect() {
    return this.remind<Effect>(Memory.Effect)
  }

  get goToEffect() {
    return this.rules().startPlayerTurn(this.effect, this.player)
  }

  get hasRecruitement() {
    return this.remind(Memory.Recruitements)
  }
}

export { RecruitHeroRules }
