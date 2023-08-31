import { MaterialGame, MaterialRulesPart } from "@gamepark/rules-api";
import { PlayerId } from "../../player/Player";
import { MaterialType } from "../../material/MaterialType";
import { LocationType } from "../../material/LocationType";
import { tokenSpaces } from "../../material/PlayerBoardSpace";

export default class Bid extends MaterialRulesPart {

  constructor(game: MaterialGame, readonly player: PlayerId) {
    super(game);
  }

  get combinations() {
    const playerCoins = this.material(MaterialType.Coin).player(this.player)
    const coinsOnBoard = playerCoins.location(LocationType.PlayerBoard)
    const coinsInHand = playerCoins.location(LocationType.Hand)

    return tokenSpaces.flatMap((id) => {
      if (coinsOnBoard.location((location) => location.id === id).length) return []
      return coinsInHand.moveItems({ location: { type: LocationType.PlayerBoard, id, player: this.player } })
    })
  }
}