import { MaterialGameSetup, MaterialMove } from "@gamepark/rules-api";
import { PlayerId } from "./state/Player";
import { MaterialType } from "./material/MaterialType";
import { LocationType } from "./material/LocationType";
import { NidavellirOptions } from "./NidavellirOptions";
import shuffle from "lodash/shuffle";
import { TAVERN_COUNT } from "./utils/constants";
import { bronzeCoins, Coin, goldCoins } from "./material/Coin";
import { lessThan4PlayersTreasure, moreThan3PlayersTreasure } from "./configuration/CoinPerPlayers";
import { baseGems, Gem } from "./material/Gem";
import { RuleId } from "./rules/RuleId";
import { distinctions } from "./material/Distinction";
import { age1Cards, age2Cards, Card, CardDeck, heroCards } from "./material/Card";
import { cardsMinPlayers } from "./configuration/CardsMinPlayers";
import { MIN_DWARVES_PER_TAVERN } from "./rules/helpers/Tavern";

export class NidavellirSetup extends MaterialGameSetup<PlayerId, MaterialType, LocationType, NidavellirOptions> {
  setupMaterial(options: NidavellirOptions): void {
    this.setupPlayers(options)
    this.setupCoins(options)
    this.setupGems()
    this.setupDistinctions()
    this.setupCard(options)
    this.setupTavern(options)
    this.setupHeroes()
  }

  start(_options: NidavellirOptions) {
    return { id: RuleId.Bids }
  }

  setupCard(options: NidavellirOptions) {
    const age1 = age1Cards.filter((c) => options.players >= (cardsMinPlayers[c] ?? 0))
    const age2 = age2Cards.filter((c) => options.players >= (cardsMinPlayers[c] ?? 0))

    // Age 1 Deck
    this.material(MaterialType.Card)
      .createItems(age1.map((front) => ({ id: { back: CardDeck.Age1, front }, location: { type: LocationType.Age1Deck } })))
    this.material(MaterialType.Card).location(LocationType.Age1Deck).shuffle()

    // Age 2 Deck
    this.material(MaterialType.Card)
      .createItems(age2.map((front) => ({ id: { back: CardDeck.Age2, front }, location: { type: LocationType.Age2Deck } })))
    this.material(MaterialType.Card).location(LocationType.Age2Deck).shuffle()

    this.material(MaterialType.Card)
      .createItem({ id: { back: CardDeck.Distinction, front: Card.BlacksmithDwarfKingsGreatArmorer }, location: { type: LocationType.DistinctionsDeck } })

  }

  setupHeroes() {
    this.material(MaterialType.Card).createItems(
      heroCards.map((front) => ({ id: { back: CardDeck.Hero, front }, location: { type: LocationType.HeroesDeck } }))
    )
  }

  setupCoins(options: NidavellirOptions) {
    const goldCoinQuantities = options.players <= 3 ? lessThan4PlayersTreasure : moreThan3PlayersTreasure
    this.material(MaterialType.Coin)
      .createItems(
        goldCoins.flatMap((id) =>
          Array.from(Array(goldCoinQuantities[id] ?? 1)).map(() => ({ id, location: { type: LocationType.Treasure } }))
        )
      )

    this.material(MaterialType.Coin).createItem({ id: Coin.HuntingMasterCoin, location: { type: LocationType.DistinctionsDeck } })
  }

  setupGems() {
    this.material(MaterialType.Gem).createItem({ id: Gem.Gem6, location: { type: LocationType.DistinctionsDeck } })
  }

  setupDistinctions() {
    this.material(MaterialType.Distinction).createItems(
      distinctions.map((id) => ({ id, location: { type: LocationType.DistinctionsDeck } }))
    )
  }

  setupPlayers(options: NidavellirOptions) {
    const gems = shuffle(baseGems)
    for (let index = 0; index < options.players; index++) {
      const playerId = index + 1
      this.setupPlayer(playerId, gems[index])
    }
  }

  setupPlayer(playerId: PlayerId, gem: Gem) {
    const location = { type: LocationType.PlayerBoard, player: playerId }
    this.material(MaterialType.Coin).createItems(bronzeCoins.map((id) => ({ id, location })))
    this.material(MaterialType.Coin).player(playerId).shuffle()
    this.material(MaterialType.Gem).createItem({ id: gem, location })

  }

  setupTavern(options: NidavellirOptions): MaterialMove[] {
    const cardsByTavern = Math.max(MIN_DWARVES_PER_TAVERN, options.players)
    const numberOfCard = cardsByTavern * TAVERN_COUNT

    return this.material(MaterialType.Card)
      .location((location) => LocationType.Age1Deck === location.type || LocationType.Age2Deck === location.type)
      .sort(card => -card.location.x!)
      .limit(numberOfCard)
      .moveItems({ location: { type: LocationType.Tavern }})
  }

}