import { NidavellirSetup } from '@gamepark/nidavellir/NidavellirSetup'
import { NidavellirOptions } from '@gamepark/nidavellir/NidavellirOptions'
import { Card, CardId } from '@gamepark/nidavellir/cards/Cards'
import { MaterialMove } from '@gamepark/rules-api'
import { taverns } from '@gamepark/nidavellir/material/Tavern'
import { MaterialType } from '@gamepark/nidavellir/material/MaterialType'
import { LocationType } from '@gamepark/nidavellir/material/LocationType'
import { Gem } from '@gamepark/nidavellir/material/Gem'

export class TutorialSetup extends NidavellirSetup {
  tavernCard = [
    [Card.WarriorGrade3_1, Card.Hunter1, Card.ExplorerGrade5_1],
    [Card.MinerGrade0_1, Card.Blacksmith1, Card.Hunter2],
    [Card.RoyalOffering3, Card.ExplorerGrade6_1, Card.MinerGrade1_1]
  ]

  secondRoundTavernCard = [
    [Card.MinerGrade2_1, Card.ExplorerGrade11_1, Card.Hunter2],
    [Card.WarriorGrade4_1, Card.MinerGrade0_2, Card.Blacksmith2],
    [Card.WarriorGrade6_1, Card.Blacksmith1, Card.Hunter1]
  ]

  setupMaterial(options: NidavellirOptions) {
    super.setupMaterial(options)

    taverns.forEach((_, index) => this.secondRoundTavernCard[index].forEach(c =>
      this
        .material(MaterialType.Card)
        .location(LocationType.Age1Deck)
        .id<CardId>(id => id.front === c)
        .moveItem({ location: { type: LocationType.Age1Deck } })
    ))
  }

  setupTavern(_options: NidavellirOptions): MaterialMove[] {
    return taverns.flatMap((tavern, index) => this.tavernCard[index].map(c => {
        return this.material(MaterialType.Card)
          .id<CardId>(id => id.front === c)
          .moveItem({ location: { type: LocationType.Tavern, id: tavern } })
      })
    )
  }

  getGems(_options: NidavellirOptions) {
    return [Gem.Gem5, Gem.Gem4]
  }

}