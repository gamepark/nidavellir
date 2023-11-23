import { Material, MaterialGame, MaterialRulesPart } from '@gamepark/rules-api'
import sum from 'lodash/sum'
import { Card, Cards } from '../../cards/Cards'
import { DwarfType } from '../../cards/DwarfType'
import { LocationType } from '../../material/LocationType'
import { MaterialType } from '../../material/MaterialType'
import { PlayerId } from '../../player/Player'
import { Memory } from '../Memory'
import Army from './Army'

export class Score extends MaterialRulesPart {
  private army: Army;
  private commandZone: Material;

  constructor(game: MaterialGame, readonly player: PlayerId) {
    super(game);
    this.army = new Army(game, player)
    this.commandZone = this.material(MaterialType.Card).player(this.player).location(LocationType.CommandZone)
  }

  get(type?: DwarfType) {
    switch (type) {
      case DwarfType.Warrior:
        return this.warrior;
      case DwarfType.Hunter:
        return this.hunter
      case DwarfType.Miner:
        return this.miner
      case DwarfType.Blacksmith:
        return this.blacksmith
      case DwarfType.Explorer:
        return this.explorer
      default:
        return this.neutral
    }
  }


  get blacksmith() {
    const numberOfRanks = this.army.countGradesOfType(DwarfType.Blacksmith)
    if (numberOfRanks === 0) {
      return 0
    }

    return sum(Array.from(Array(numberOfRanks)).map((_, index) => 3 + index))
  }

  get hunter() {
    const numberOfRanks = this.army.countGradesOfType(DwarfType.Hunter)
    return numberOfRanks * numberOfRanks
  }

  get explorer() {
    const gradeScore = this.army.sumGradesOfType(DwarfType.Explorer)

    const iduun = this.army.getCard(Card.Idunn)
    if (iduun.length) {
      return gradeScore + 2 * this.army.countGradesOfType(DwarfType.Explorer)
    }

    return gradeScore
  }

  get miner() {
    return this.army.sumGradesOfType(DwarfType.Miner) * this.army.countGradesOfType(DwarfType.Miner)
  }

  get warrior() {
    const gradeScore = this.army.sumGradesOfType(DwarfType.Warrior)
    return gradeScore + this.warriorMajority
  }

  get warriorMajority() {
    if (this.army.hasMajorityOf(DwarfType.Warrior) && this.army.getCardOfType(DwarfType.Warrior).length) {
      return this.maximumCoinValue
    }

    return 0
  }

  get coinsTotal() {
    return this.remind(Memory.TotalCoinValue, this.player)
  }

  get maximumCoinValue() {
    return this.remind(Memory.MaxCoinValue, this.player)
  }

  get coins() {
    return this.material(MaterialType.Coin).player(this.player).getItems()
  }

  get neutral() {
    const gradeScore = sum(this.commandZone.getItems().flatMap((item) => Cards[item.id.front].grades?.[DwarfType.Neutral] ?? 0))

    return gradeScore + this.dwergBrothers + this.astrid
  }

  get astrid() {
    if (!this.commandZone.id((id: Record<string, any>) => id.front === Card.Astrid).length) return 0
    return this.maximumCoinValue
  }

  get dwergBrothers() {
    const dwergBrothers = this.commandZone.filter((item) =>
      [Card.DwergAesir, Card.DwergSigmir, Card.DwergJungir, Card.DwergYmir, Card.DwergBergelmir].includes(item.id.front)
    )

    if (!dwergBrothers.length) return 0
    return [13, 40, 81, 108, 135][dwergBrothers.length - 1]
  }


  get score() {
    return this.warrior + this.hunter + this.miner + this.blacksmith + this.explorer + this.coinsTotal + this.neutral
  }
}
