import { MaterialGameSetup, MaterialMove } from "@gamepark/rules-api";
import { PlayerId } from "./player/Player";
import { MaterialType } from "./material/MaterialType";
import { LocationType } from "./material/LocationType";
import { NidavellirOptions } from "./NidavellirOptions";
import shuffle from "lodash/shuffle";
import { bronzeCoins, Coin, goldCoins } from "./material/Coin";
import { lessThan4PlayersTreasure, moreThan3PlayersTreasure } from "./configuration/CoinPerPlayers";
import { baseGems, Gem } from "./material/Gem";
import { RuleId } from "./rules/RuleId";
import { distinctions } from "./material/Distinction";
import { age1Cards, age2Cards, Card, CardDeck, heroCards } from "./cards/Cards";
import { cardsMinPlayers } from "./configuration/CardsMinPlayers";
import { MIN_DWARVES_PER_TAVERN } from "./rules/helpers/Tavern";
import { locationsStrategies } from "./configuration/LocationStrategies";
import { taverns } from "./material/Tavern";
import { PlayerBoardSpace } from "./material/PlayerBoardSpace";
import { Memory } from "./rules/Memory";

export class NidavellirSetup extends MaterialGameSetup<PlayerId, MaterialType, LocationType, NidavellirOptions> {
  locationsStrategies = locationsStrategies
  setupMaterial(options: NidavellirOptions): void {
    this.setupPlayers(options)
    this.setupTreasure(options)
    this.setupGems()
    this.setupDistinctions()
    this.setupCard(options)
    this.setupTavern(options)
    this.setupHeroes()

    this.memorize(Memory.Tavern, 1)
    this.memorize(Memory.Age, 1)
    this.memorize(Memory.Round, 1)
  }

  start(_options: NidavellirOptions) {
    return { id: RuleId.Bids, players: this.players }
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

  setupTreasure(options: NidavellirOptions) {
    const goldCoinQuantities = options.players <= 3 ? lessThan4PlayersTreasure : moreThan3PlayersTreasure
    this.material(MaterialType.Coin)
      .createItems(
        goldCoins.flatMap((id,) =>
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

  setupPlayer(player: PlayerId, gem: Gem) {
    this.material(MaterialType.Coin).createItems(bronzeCoins.map((id) => ({ id, location: { type: LocationType.PlayerHand, player } })))
    this.material(MaterialType.Coin).player(player).shuffle()
    this.material(MaterialType.Gem).createItem({ id: gem, location: { type: LocationType.PlayerBoard, player, id: PlayerBoardSpace.Gem } })

  }

  setupTavern(options: NidavellirOptions): MaterialMove[] {
    const cardsByTavern = Math.max(MIN_DWARVES_PER_TAVERN, options.players)
    const drawnCards = this.material(MaterialType.Card)
      .location((location) => LocationType.Age1Deck === location.type)
      .sort(card => -card.location.x!)
      .limit(cardsByTavern * 3)
      .getIndexes()

    return taverns.flatMap((tavern) => this.material(MaterialType.Card)
      .indexes(drawnCards.splice(0, 3))
      .moveItems({ location: { type: LocationType.Tavern, id: tavern }})
    )
  }

}