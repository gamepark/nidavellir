/** @jsxImportSource @emotion/react */
import { Card, CardDeck } from '@gamepark/nidavellir/cards/Cards'
import { CardDescription } from '@gamepark/react-game'
import Images from '../images/Images'
import { DwarfCardRules } from './rules/DwarfCardRules'

export class DwarfCardDescription extends CardDescription {
  width = 5.4
  height = 8
  borderRadius = 0.3

  backImages = {
    [CardDeck.Age1]: Images.Age1Back,
    [CardDeck.Age2]: Images.Age2Back,
    [CardDeck.Hero]: Images.HeroBack
  }

  images = {
    [Card.WarriorGrade3_1]: Images.WarriorGrade3_1,
    [Card.WarriorGrade3_2]: Images.WarriorGrade3_2,
    [Card.WarriorGrade4_1]: Images.WarriorGrade4_1,
    [Card.WarriorGrade4_2]: Images.WarriorGrade4_2,
    [Card.WarriorGrade5_1]: Images.WarriorGrade5_1,
    [Card.WarriorGrade5_2]: Images.WarriorGrade5_2,
    [Card.WarriorGrade6_1]: Images.WarriorGrade6_1,
    [Card.WarriorGrade6_2]: Images.WarriorGrade6_2,
    [Card.WarriorGrade7_1]: Images.WarriorGrade7_1,
    [Card.WarriorGrade7_2]: Images.WarriorGrade7_2,
    [Card.WarriorGrade8_1]: Images.WarriorGrade8_1,
    [Card.WarriorGrade8_2]: Images.WarriorGrade8_2,
    [Card.WarriorGrade9_1]: Images.WarriorGrade9_1,
    [Card.WarriorGrade9_2]: Images.WarriorGrade9_2,
    [Card.WarriorGrade10_1]: Images.WarriorGrade10_1,
    [Card.WarriorGrade10_2]: Images.WarriorGrade10_2,

    [Card.Hunter1]: Images.Hunter1,
    [Card.Hunter2]: Images.Hunter2,

    [Card.MinerGrade0_1]: Images.MinerGrade0_1,
    [Card.MinerGrade0_2]: Images.MinerGrade0_2,
    [Card.MinerGrade1_1]: Images.MinerGrade1_1,
    [Card.MinerGrade1_2]: Images.MinerGrade1_2,
    [Card.MinerGrade2_1]: Images.MinerGrade2_1,
    [Card.MinerGrade2_2]: Images.MinerGrade2_2,

    [Card.Blacksmith1]: Images.Blacksmith1,
    [Card.Blacksmith2]: Images.Blacksmith2,

    [Card.ExplorerGrade5_1]: Images.ExplorerGrade5_1, // Explorer 5
    [Card.ExplorerGrade5_2]: Images.ExplorerGrade5_2, // Explorer 5
    [Card.ExplorerGrade6_1]: Images.ExplorerGrade6_1, // Explorer 6
    [Card.ExplorerGrade6_2]: Images.ExplorerGrade6_2, // Explorer 6
    [Card.ExplorerGrade7_1]: Images.ExplorerGrade7_1, // Explorer 7
    [Card.ExplorerGrade7_2]: Images.ExplorerGrade7_2, // Explorer 7
    [Card.ExplorerGrade8_1]: Images.ExplorerGrade8_1, // Explorer 8
    [Card.ExplorerGrade8_2]: Images.ExplorerGrade8_2, // Explorer 8
    [Card.ExplorerGrade9_1]: Images.ExplorerGrade9_1, // Explorer 9
    [Card.ExplorerGrade9_2]: Images.ExplorerGrade9_2, // Explorer 9
    [Card.ExplorerGrade10_1]: Images.ExplorerGrade10_1, // Explorer 10
    [Card.ExplorerGrade10_2]: Images.ExplorerGrade10_2, // Explorer 10
    [Card.ExplorerGrade11_1]: Images.ExplorerGrade11_1, // Explorer 11
    [Card.ExplorerGrade11_2]: Images.ExplorerGrade11_2, // Explorer 11
    [Card.ExplorerGrade12_1]: Images.ExplorerGrade12_1, // Explorer 12
    [Card.ExplorerGrade12_2]: Images.ExplorerGrade12_2, // Explorer 12

    [Card.RoyalOffering3]: Images.RoyalOffering3,
    [Card.RoyalOffering5]: Images.RoyalOffering5,

    [Card.BlacksmithKingsGreatArmorer]: Images.BlacksmithKingsGreatArmorer,

    [Card.Bonfur]: Images.Bonfur,
    [Card.Aegur]: Images.Aegur,
    [Card.Dagda]: Images.Dagda,
    [Card.Aral]: Images.Aral,
    [Card.Kraal]: Images.Kraal,
    [Card.Tarah]: Images.Tarah,
    [Card.Lokdur]: Images.Lokdur,
    [Card.Zoral]: Images.Zoral,
    [Card.Idunn]: Images.Idunn,
    [Card.Hourya]: Images.Hourya,
    [Card.Astrid]: Images.Astrid,
    [Card.DwergYmir]: Images.DwergYmir,
    [Card.DwergAesir]: Images.DwergAesir,
    [Card.DwergSigmir]: Images.DwergSigmir,
    [Card.DwergJungir]: Images.DwergJungir,
    [Card.DwergBergelmir]: Images.DwergBergelmir,
    [Card.Thrud]: Images.Thrud,
    [Card.Ylud]: Images.Ylud,
    [Card.Skaa]: Images.Skaa,
    [Card.Uline]: Images.Uline,
    [Card.Grid]: Images.Grid
  }

  rules = DwarfCardRules
}

export const cardDescription = new DwarfCardDescription()
