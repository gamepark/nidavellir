import { isMoveItemType, Material, MaterialGame, MaterialItem, MaterialMove, MaterialRulesPart } from "@gamepark/rules-api";
import { MaterialType } from "../../material/MaterialType";
import { LocationType } from "../../material/LocationType";
import { Card, isHero, isRoyalOffering } from "../../material/Card";
import { Memory } from "../Memory";
import { Cards } from "../../cards/Cards";
import sum from "lodash/sum";
import { PlayerId } from "../../state/Player";
import { DwarfType } from "../../cards/DwarfDescription";
import { RuleId } from "../RuleId";

export default class Army extends MaterialRulesPart {
  private army: Material
  private heroCount: number

  constructor(game: MaterialGame, readonly player: PlayerId) {
    super(game)
    this.heroCount = this.material(MaterialType.Card).player(player).filter((item) => isHero(item.id.front)).length
    this.army = this.material(MaterialType.Card).location(LocationType.Army).player(player)
  }

  onRecruit(move: MaterialMove): MaterialMove[] {
    const moves = this.mayMoveThrud(move)
    this.mayRecruitNewHeroes(move)

    if (moves.length) {
      return moves
    }

    return []
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

    const army = this.army
    const thrud = army.filter((item) => item.id.front === Card.Thrud)
    if (!thrud.length || thrud.getIndex() === move.itemIndex) return []

    return [
      thrud.moveItem({ location: { type: LocationType.PlayerHand, player: thrud.getItem()!.location.player } }),
      this.rules().startPlayerTurn(RuleId.Thrud, this.player)
    ]
  }

  computeRecruitHeroCount(move: MaterialMove): number {
    if (!isMoveItemType(MaterialType.Card)(move) || move.position.location?.type !== LocationType.Army) return 0;
    const card = this.army.getItem(move.itemIndex)!
    const gradesByTypes = {
      [DwarfType.Blacksmith]: this.countGradesOfType(DwarfType.Blacksmith),
      [DwarfType.Hunter]: this.countGradesOfType(DwarfType.Hunter),
      [DwarfType.Warrior]: this.countGradesOfType(DwarfType.Warrior),
      [DwarfType.Explorer]: this.countGradesOfType(DwarfType.Explorer),
      [DwarfType.Miner]: this.countGradesOfType(DwarfType.Miner)
    }

    const minGradesBeforeCard = Math.min(
      gradesByTypes[DwarfType.Blacksmith] - this.getCardGradesCount(card, DwarfType.Blacksmith),
      gradesByTypes[DwarfType.Hunter] - this.getCardGradesCount(card, DwarfType.Hunter),
      gradesByTypes[DwarfType.Warrior] - this.getCardGradesCount(card, DwarfType.Warrior),
      gradesByTypes[DwarfType.Explorer] - this.getCardGradesCount(card, DwarfType.Explorer),
      gradesByTypes[DwarfType.Miner] - this.getCardGradesCount(card, DwarfType.Miner)
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

  getCardGradesCount(card: MaterialItem, type: DwarfType) {
    if (card.location.x !== type) return 0

    const cardId = card.id.front
    const description = Cards[cardId]
    if (isRoyalOffering(cardId)) return 0

    return description.grades?.[type].length ?? 0
  }

  countGradesOfType(type: DwarfType) {
    return sum(
      this.army
        .filter((item) => item.location.x === type)
        .getItems()
        .map((item) => Cards[item.id.front].grades?.[type]?.length ?? 0)
    )
  }
}