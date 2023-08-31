/** @jsxImportSource @emotion/react */
import { Card, CardDeck } from "@gamepark/nidavellir/cards/Cards";
import Images from "../images/Images";
import { CardDescription } from "@gamepark/react-game/dist/components/material/FlatMaterial/CardDescription";

export class DwarfCardDescription extends CardDescription {
  width = 5.4
  ratio = 54 / 80
  borderRadius = 0.3

  backImages = {
    [CardDeck.Age1]: Images.Age1Back,
    [CardDeck.Age2]: Images.Age2Back
  }

  images = {
    [Card.Warrior1]: Images.WarriorGrade3_1,
    [Card.Warrior2]: Images.WarriorGrade3_2,
    [Card.Warrior3]: Images.WarriorGrade4_1,
    [Card.Warrior4]: Images.WarriorGrade4_2,
    [Card.Warrior5]: Images.WarriorGrade5_1,
    [Card.Warrior6]: Images.WarriorGrade5_2,
    [Card.Warrior7]: Images.WarriorGrade6_1,
    [Card.Warrior8]: Images.WarriorGrade6_2,
    [Card.Warrior9]: Images.WarriorGrade7_1,
    [Card.Warrior10]: Images.WarriorGrade7_2,
    [Card.Warrior11]: Images.WarriorGrade8_1,
    [Card.Warrior12]: Images.WarriorGrade8_2,
    [Card.Warrior13]: Images.WarriorGrade9_1,
    [Card.Warrior14]: Images.WarriorGrade9_2,
    [Card.Warrior15]: Images.WarriorGrade10_1,
    [Card.Warrior16]: Images.WarriorGrade10_2,

    [Card.Hunter1]: Images.Hunter1,
    [Card.Hunter2]: Images.Hunter2,

    [Card.Miner1]: Images.MinerGrade0_1,
    [Card.Miner2]: Images.MinerGrade0_2,
    [Card.Miner3]: Images.MinerGrade1_1,
    [Card.Miner4]: Images.MinerGrade1_2,
    [Card.Miner5]: Images.MinerGrade2_1,
    [Card.Miner6]: Images.MinerGrade2_2,

    [Card.Blacksmith1]: Images.Blacksmith1,
    [Card.Blacksmith2]: Images.Blacksmith2,

    [Card.Explorer1]: Images.ExplorerGrade5_1, // Explorer 5
    [Card.Explorer2]: Images.ExplorerGrade5_2, // Explorer 5
    [Card.Explorer3]: Images.ExplorerGrade6_1, // Explorer 6
    [Card.Explorer4]: Images.ExplorerGrade6_2, // Explorer 6
    [Card.Explorer5]: Images.ExplorerGrade7_1, // Explorer 7
    [Card.Explorer6]: Images.ExplorerGrade7_2, // Explorer 7
    [Card.Explorer7]: Images.ExplorerGrade8_1, // Explorer 8
    [Card.Explorer8]: Images.ExplorerGrade8_2, // Explorer 8
    [Card.Explorer9]: Images.ExplorerGrade9_1, // Explorer 9
    [Card.Explorer10]: Images.ExplorerGrade9_2, // Explorer 9
    [Card.Explorer11]: Images.ExplorerGrade10_1, // Explorer 10
    [Card.Explorer12]: Images.ExplorerGrade10_2, // Explorer 10
    [Card.Explorer13]: Images.ExplorerGrade11_1, // Explorer 11
    [Card.Explorer14]: Images.ExplorerGrade11_2, // Explorer 11
    [Card.Explorer15]: Images.ExplorerGrade12_1, // Explorer 12
    [Card.Explorer16]: Images.ExplorerGrade12_2, // Explorer 12

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
    [Card.Grid]: Images.Grid,
  }

  rules = () => <p></p>
}

export const cardDescription = new DwarfCardDescription()
