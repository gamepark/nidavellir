import { listingToList, MaterialGameSetup, MaterialMove } from '@gamepark/rules-api'
import shuffle from 'lodash/shuffle'
import { Card, CardDeck, heroCards } from './cards/Cards'
import { age1For5Players, age1ForMinus5Players, age2For5Players, age2ForMinus5Players } from './configuration/CardsMinPlayers'
import { lessThan4PlayersTreasure, moreThan3PlayersTreasure } from './configuration/CoinPerPlayers'
import { bronzeCoins, Coin, goldCoins } from './material/Coin'
import { distinctions } from './material/Distinction'
import { baseGems, Gem } from './material/Gem'
import { LocationType } from './material/LocationType'
import { MaterialType } from './material/MaterialType'
import { PlayerBoardSpace } from './material/PlayerBoardSpace'
import { taverns } from './material/Tavern'
import { NidavellirOptions } from './NidavellirOptions'
import { NidavellirRules } from './NidavellirRules'
import { PlayerId } from './player/Player'
import { MIN_DWARVES_PER_TAVERN } from './rules/helpers/Tavern'
import { Memory } from './rules/Memory'
import { RuleId } from './rules/RuleId'

export class NidavellirSetup extends MaterialGameSetup<PlayerId, MaterialType, LocationType, NidavellirOptions> {
  Rules = NidavellirRules
  setupMaterial(options: NidavellirOptions): void {
    this.setupDistinctionGem()
    this.setupDistinctions()
    this.setupTreasure(options)
    this.setupHeroes()
    this.setupCard(options)
    this.setupTavern(options)
    this.setupPlayers(options)

    this.memorize(Memory.Age, 1)
    this.memorize(Memory.Round, 1)
  }

  setupCard(options: NidavellirOptions) {
    this.createAge1Deck(options)
    this.createAge2Deck(options)
    this.material(MaterialType.Card)
      .createItem({ id: { back: CardDeck.Distinction, front: Card.BlacksmithKingsGreatArmorer }, location: { type: LocationType.DistinctionsDeck } })

  }

  createAge1Deck(options: NidavellirOptions) {
    const age1 = this.getAge1Cards(options)
    // Age 1 Deck
    this.material(MaterialType.Card)
      .createItems(age1.map((front) => ({ id: { back: CardDeck.Age1, front }, location: { type: LocationType.Age1Deck } })))
    this.material(MaterialType.Card).location(LocationType.Age1Deck).shuffle()
  }

  createAge2Deck(options: NidavellirOptions) {
    const age2 = this.getAge2Cards(options)

    this.material(MaterialType.Card)
      .createItems(age2.map((front) => ({ id: { back: CardDeck.Age2, front }, location: { type: LocationType.Age2Deck } })))
    this.material(MaterialType.Card).location(LocationType.Age2Deck).shuffle()
  }

  getAge1Cards(options: NidavellirOptions): Card[] {
    const cardQuantities = options.players === 5 ? age1For5Players : age1ForMinus5Players
    return listingToList(cardQuantities)
  }

  getAge2Cards(options: NidavellirOptions): Card[] {
    const cardQuantities = options.players === 5 ? age2For5Players : age2ForMinus5Players
    return listingToList(cardQuantities)
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
        goldCoins.flatMap((id) =>
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

  getGems(options: NidavellirOptions) {
    return shuffle(baseGems.slice(-options.players))
  }

  setupPlayers(options: NidavellirOptions) {
    const gems = this.getGems(options)
    for (let index = 0; index < options.players; index++) {
      const playerId = index + 1
      this.setupPlayer(playerId, gems[index])
    }
  }

  setupPlayer(player: PlayerId, gem: Gem) {
    this.material(MaterialType.Coin).createItems(bronzeCoins.map((id) => ({ id, location: { type: LocationType.Hand, player } })))
    this.material(MaterialType.Coin).player(player).shuffle()
    this.material(MaterialType.Gem).createItem({ id: gem, location: { type: LocationType.PlayerBoard, player, id: PlayerBoardSpace.Gem } })
    this.memorize(Memory.TotalCoinValue, 14, player)
    this.memorize(Memory.MaxCoinValue, 5, player)
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
      .moveItems({ type: LocationType.Tavern, id: tavern })
    )
  }

  start() {
    this.startSimultaneousRule(RuleId.Bids)
  }
}
