import { MaterialGame, MaterialRulesPart } from "@gamepark/rules-api";
import { PlayerId } from "../../state/Player";
import { MaterialType } from "../../material/MaterialType";
import { LocationType } from "../../material/LocationType";

export default class Bid extends MaterialRulesPart {

  constructor(game: MaterialGame, readonly player: PlayerId) {
    super(game);
  }

  get combinations() {
    const playerCoins = this.material(MaterialType.Coin).player(this.player)
    const coinsOnBoard = playerCoins.location(LocationType.PlayerBoard)
    const coinsInHand = playerCoins.location(LocationType.PlayerHand)

    return Array.from(Array(5)).flatMap((x) => {
      if (coinsOnBoard.location((location) => location.x === x)) return []
      return coinsInHand.moveItems({ location: { type: LocationType.PlayerBoard, x, player: this.player }, rotation: { y: 1 } })
    })
  }
}