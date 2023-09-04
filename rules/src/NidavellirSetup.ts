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
import { Card, CardDeck, dwarfCards, heroCards } from "./cards/Cards";
import { age1For5Players, age1ForMinus5Players, age2For5Players, age2ForMinus5Players } from "./configuration/CardsMinPlayers";
import { MIN_DWARVES_PER_TAVERN } from "./rules/helpers/Tavern";
import { locationsStrategies } from "./configuration/LocationStrategies";
import { taverns } from "./material/Tavern";
import { PlayerBoardSpace } from "./material/PlayerBoardSpace";
import { Memory } from "./rules/Memory";

export class NidavellirSetup extends MaterialGameSetup<PlayerId, MaterialType, LocationType, NidavellirOptions> {
  locationsStrategies = locationsStrategies
  setupMaterial(options: NidavellirOptions): void {
    this.setupDistinctionGem()
    this.setupDistinctions()
    this.setupTreasure(options)
    this.setupHeroes()
    this.setupCard(options)
    this.setupTavern(options)
    this.setupPlayers(options)

    this.memorize(Memory.Tavern, 1)
    this.memorize(Memory.Age, 1)
    this.memorize(Memory.Round, 1)
  }

  start(_options: NidavellirOptions) {
    return { id: RuleId.Bids, players: this.players }
  }

  setupCard(options: NidavellirOptions) {
    const age1 = this.getAge1Cards(options)
    const age2 = this.getAge2Cards(options)

    // Age 1 Deck
    this.material(MaterialType.Card)
      .createItems(age1.map((front) => ({ id: { back: CardDeck.Age1, front }, location: { type: LocationType.Age1Deck } })))
    this.material(MaterialType.Card).location(LocationType.Age1Deck).shuffle()

    // Age 2 Deck
    this.material(MaterialType.Card)
      .createItems(age2.map((front) => ({ id: { back: CardDeck.Age2, front }, location: { type: LocationType.Age2Deck } })))
    this.material(MaterialType.Card).location(LocationType.Age2Deck).shuffle()

    this.material(MaterialType.Card)
      .createItem({ id: { back: CardDeck.Distinction, front: Card.BlacksmithKingsGreatArmorer }, location: { type: LocationType.DistinctionsDeck } })

  }

  getAge1Cards(options: NidavellirOptions): Card[] {
    const cardQuantities = options.players === 5? age1For5Players: age1ForMinus5Players
    return dwarfCards.flatMap((c) => Array.from(Array(cardQuantities[c] ?? 1)).fill(c) )
  }

  getAge2Cards(options: NidavellirOptions): Card[] {
    const cardQuantities = options.players === 5? age2For5Players: age2ForMinus5Players
    return dwarfCards.flatMap((c) => Array.from(Array(cardQuantities[c] ?? 1)).fill(c) )
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

  setupDistinctionGem() {
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
    this.material(MaterialType.Coin).createItems(bronzeCoins.map((id) => ({ id, location: { type: LocationType.Hand, player } })))
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
      .indexes(drawnCards.splice(0, cardsByTavern))
      .moveItems({ location: { type: LocationType.Tavern, id: tavern }})
    )
  }

}