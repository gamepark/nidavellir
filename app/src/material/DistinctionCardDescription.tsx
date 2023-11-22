/** @jsxImportSource @emotion/react */
import Images from "../images/Images";
import { CardDescription } from "@gamepark/react-game";
import { Distinction } from "@gamepark/nidavellir/material/Distinction";
import { DistinctionHelp } from "./rules/DistinctionHelp";

export class DistinctionCardDescription extends CardDescription {
  width = 5.4
  ratio = 54 / 80
  borderRadius = 0.3

  images = {
    [Distinction.KingsHand]: Images.KingsHand,
    [Distinction.HuntingMaster]: Images.HuntingMaster,
    [Distinction.CrownJeweler]: Images.CrownJeweler,
    [Distinction.KingsGreatArmorer]: Images.KingsGreatArmorer,
    [Distinction.PioneerOfTheKingdom]: Images.PioneerOfTheKingdom
  }

  help = DistinctionHelp
}

export const distinctionDescription = new DistinctionCardDescription()
