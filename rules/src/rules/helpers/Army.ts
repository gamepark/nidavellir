import { Material, MaterialGame, MaterialItem, MaterialRulesPart } from "@gamepark/rules-api";
import { MaterialType } from "../../material/MaterialType";
import { LocationType } from "../../material/LocationType";
import { Card, Cards, isRoyalOffering } from "../../cards/Cards";
import sum from "lodash/sum";
import { PlayerId } from "../../player/Player";
import { DwarfType } from "../../cards/DwarfType";

export default class Army extends MaterialRulesPart {
  private army: Material

  constructor(game: MaterialGame, readonly player: PlayerId) {
    super(game)
    this.army = this.material(MaterialType.Card).location(LocationType.Army).player(player)
  }

  getCard(card: Card) {
    return this.army.id(({ front }: Record<string, any>) => front === card)
  }

  getItem(index: number) {
    return this.army.getItem(index)
  }

  getCardGradesCount(card: MaterialItem, type: DwarfType) {
    if (card.location.id !== type) return 0

    const cardId = card.id.front
    const description = Cards[cardId]
    if (isRoyalOffering(cardId)) return 0

    return description.grades?.[type]?.length ?? 0
  }

  getCardOfType(type: DwarfType) {
    return this.army.filter((item) => item.location.id === type)
  }

  getGradeIndex(card: MaterialItem) {
    const type = card.location.id
    const cardsInColumn = this.getCardOfType(type).sort((item) => item.location.x!)
    let grades = 0
    for (const other of cardsInColumn.getItems()) {
      if (other.location.x! < card.location.x!) {
        grades += this.getCardGradesCount(other, type)
        continue
      }
      return grades
    }

    return grades
  }

  countGradesOfType(type: DwarfType) {
    return sum(
      this.army
        .filter((item) => item.location.id === type)
        .getItems()
        .map((item) => Cards[item.id.front].grades?.[type]?.length ?? 0)
    )
  }

  sumGradesOfType(type: DwarfType) {
    return sum(
      this.army
        .filter((item) => item.location.id === type)
        .getItems()
        .flatMap((item) => Cards[item.id.front].grades?.[type] ?? [])
    )
  }

  getPlayersWithMajority(type: DwarfType) {
    let majority: number = 0
    let playersWithMajority: PlayerId[] = []
    for (const player of this.game.players) {
      const ranks = this.countGradesOfType(type)
      if (ranks > majority) {
        majority = ranks
        playersWithMajority = [player]
      } else if (ranks === majority) {
        playersWithMajority.push(player)
      }
    }

    return playersWithMajority
  }

  hasStrictMajorityOf(type: DwarfType) {
    const players = this.getPlayersWithMajority(type)
    if (players.length > 1) return false
    return players.includes(this.player)
  }

  hasMajorityOf(type: DwarfType) {
    return this.getPlayersWithMajority(type).includes(this.player)
  }
}