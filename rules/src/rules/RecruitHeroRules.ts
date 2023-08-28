import { isMoveItemType, ItemMove, MaterialItem, RuleMove } from "@gamepark/rules-api";
import { MaterialType } from "../material/MaterialType";
import { LocationType } from "../material/LocationType";
import { Cards, isHero } from "../cards/Cards";
import { Memory } from "./Memory";
import PlayerTurn from "./helpers/PlayerTurn";
import { EffectRule } from "./effect/EffectRule";
import Army from "./helpers/Army";
import { HeroDescription } from "../cards/HeroDescription";

class RecruitHeroRules extends EffectRule {

  onRuleStart(_move: RuleMove) {
    return new PlayerTurn(this.game, this.player).goToEffect
  }

  getPlayerMoves() {
    const chooseCard = new PlayerTurn(this.game, this.player)
    return this
      .material(MaterialType.Card)
      .location(LocationType.HeroesDeck)
      .filter((item) => this.canBeRecruited(item))
      .moveItems((item) => ({ location: chooseCard.getCardLocation(item.id.front) }))
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

  canBeRecruited (item: MaterialItem): boolean {
    const id = item.id.front
    const description = Cards[id] as HeroDescription
    if (!description.minGrades) return true;

    return new Army(this.game, this.player).countGradesOfType(description.type) >= description.minGrades
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.Card)(move)) return []

    return new PlayerTurn(this.game, this.player).onChooseCard(move)
  }
}

export { RecruitHeroRules }
