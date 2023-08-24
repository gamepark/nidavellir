import { MaterialType } from "../../material/MaterialType";
import { LocationType } from "../../material/LocationType";
import HeroRules from "./HeroRules";

export class UlineRules extends HeroRules {
  onRuleStart() {
    return [
      ...this.hiddenCoins.moveItems({ location: { type: LocationType.PlayerHand, player: this.player } }),
      this.goBackToRecruitHeroRules
    ]
  }

  get hiddenCoins() {
    return this.material(MaterialType.Card)
      .location(LocationType.PlayerBoard)
      .player(this.player)
      .rotation((rotation) => rotation?.y === 1)
  }
}