/** @jsxImportSource @emotion/react */
import Images from "../images/Images";
import { TokenDescription } from "@gamepark/react-game";
import { Gem } from "@gamepark/nidavellir/material/Gem";
import { GemRules } from "./rules/GemRules";

export class GemDescription extends TokenDescription  {
  width = 5.2
  ratio = 300 / 453
  images = {
    [Gem.Gem1]: Images.Gem1,
    [Gem.Gem2]: Images.Gem2,
    [Gem.Gem3]: Images.Gem3,
    [Gem.Gem4]: Images.Gem4,
    [Gem.Gem5]: Images.Gem5,
    [Gem.Gem6]: Images.Gem6,
  }

  rules = GemRules
}

export const gemDescription = new GemDescription()
