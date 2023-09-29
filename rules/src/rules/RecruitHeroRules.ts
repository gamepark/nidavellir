import { isMoveItemType, ItemMove, MaterialItem, RuleMove } from "@gamepark/rules-api";
import { MaterialType } from "../material/MaterialType";
import { LocationType } from "../material/LocationType";
import { Cards, isHero } from "../cards/Cards";
import { Memory } from "./Memory";
import PlayerTurn from "./helpers/PlayerTurn";
import { EffectRule } from "./effect/EffectRule";
import Army from "./helpers/Army";
import { HeroDescription } from "../cards/HeroDescription";
import { getTypes } from '../cards/DwarfDescription'

class RecruitHeroRules extends EffectRule {

  onRuleStart(_move: RuleMove) {
    return new PlayerTurn(this.game, this.player).goToEffect
  }

  getPlayerMoves() {
    const playerTurn = new PlayerTurn(this.game, this.player)

    const heroes = this
      .material(MaterialType.Card)
      .location(LocationType.HeroesDeck)
      .filter((item) => this.canBeRecruited(item))

    const moves = []
    for (const hero of heroes.getIndexes()) {
      const locations = playerTurn.getCardLocations(heroes.getItem(hero)!.id.front)
      moves.push(
        ...locations.map((location) => heroes.index(hero).moveItem({ location }))
      )
    }

    return moves;
  }

  beforeItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.Card)(move)) return []

    const movedItem = this.material(MaterialType.Card).getItem(move.itemIndex)!
    if (isHero(movedItem.id.front) && movedItem.location.type !== LocationType.Army) {
      const recruitements = this.remind(Memory.Recruitments)
      if (recruitements === 1) {
        this.forget(Memory.Recruitments)
      } else {
        this.memorize(Memory.Recruitments, recruitements - 1)
      }
    }

    return []
  }

  canBeRecruited (item: MaterialItem): boolean {
    const id = item.id.front
    const description = Cards[id] as HeroDescription
    if (!description.minGrades) return true;

    const army = new Army(this.game, this.player)
    return getTypes(description).every((type) => army.countGradesOfType(type, true) >= description.minGrades!)
  }

  afterItemMove(move: ItemMove) {
    if (!isMoveItemType(MaterialType.Card)(move)) return []

    return new PlayerTurn(this.game, this.player).onChooseCard(move)
  }
}

export { RecruitHeroRules }
