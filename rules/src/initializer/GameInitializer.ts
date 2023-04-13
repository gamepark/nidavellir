import { NidavellirOptions } from '../NidavellirOptions'
import GameState, { Phase, Step } from '../state/GameState'
import { Player } from '../state/Player'
import { LocatedCard } from '../state/LocatedCard'
import { LocatedCoin } from '../state/LocatedCoin'
import { LocatedGem } from '../state/LocatedGem'
import { BlacksmithDwarfKingsGreatArmorer, Cards } from '../cards/Cards'
import { LocationType } from '../state/Location'
import shuffle from 'lodash/shuffle'
import { Distinctions } from '../cards/Distinctions'
import { Coins, HuntingMasterCoin } from '../coins/Coins'
import { CoinColor } from '../coins/Coin'
import { Gem6, Gems } from '../gems/Gems'
import { Heroes } from '../cards/Heroes'
import { getCardByTavern } from '../utils/tavern.utils'
import { TAVERN_COUNT } from '../utils/constants'
import values from 'lodash/values'
import groupBy from 'lodash/groupBy'
import partition from 'lodash/partition'
import mapValues from 'lodash/mapValues'

class GameInitializer {
  private options: NidavellirOptions

  constructor(options: NidavellirOptions) {
    this.options = options
  }

  private initializeAgeCards = (): LocatedCard[] => {
    const allCards = Array.from(Cards.entries())
    const cards = allCards.filter(
      ([, card]) =>
        card !== BlacksmithDwarfKingsGreatArmorer &&
        (!card.minPlayers || this.options.players.length >= card.minPlayers)
    )

    const distinctionCard = allCards.find(([, card]) => card === BlacksmithDwarfKingsGreatArmorer)![0]
    const [age1, age2] = partition(shuffle(cards), (c) => c[1].age === 1)

    const cardsByTavern = getCardByTavern(this.options.players.map((p) => p.id))
    const numberOfCard = cardsByTavern * TAVERN_COUNT
    const drawnTavernCard = age1.splice(0, numberOfCard)
    return [
      ...drawnTavernCard.map(
        ([id], index): LocatedCard => ({
          id,
          location: {
            type: LocationType.Tavern,
            tavern: Math.floor(index / cardsByTavern),
            index: index % cardsByTavern
          }
        })
      ),
      ...age1.map(
        ([id], index): LocatedCard => ({
          id,
          location: { type: LocationType.Age1Deck, index: age1.length - 1 - index }
        })
      ),
      ...age2.map(
        ([id], index): LocatedCard => ({
          id,
          location: { type: LocationType.Age2Deck, index: age2.length - 1 - index }
        })
      ),
      {
        id: distinctionCard,
        location: { type: LocationType.DistinctionsDeck, index: 0 }
      }
    ]
  }

  private initializeCoins = (): LocatedCoin[] => {
    const coins = shuffle(Array.from(Coins.entries()))
    const goldCoins = mapValues(groupBy(
      coins.filter(([, coin]) => coin.color === CoinColor.Gold),
      (c) => c[1].value
    ), (coins, key) => (this.options.players.length <= 3 && [7, 9, 11].includes(+key)) ? [coins[0]] : coins)

    const baseCoinsByValue: Record<number, any> = groupBy(
      coins.filter(([, coin]) => coin.color === CoinColor.Bronze),
      (c) => c[1].value
    )

    const huntingMasterCoin = coins.find(([, coin]) => coin === HuntingMasterCoin)![0]

    return [
      ...this.options.players.flatMap((p, index) => {
        return [
          baseCoinsByValue[0][index],
          baseCoinsByValue[2][index],
          baseCoinsByValue[3][index],
          baseCoinsByValue[4][index],
          baseCoinsByValue[5][index]
        ].map(([id], index): LocatedCoin => {
          return {
            id,
            location: { type: LocationType.PlayerHand, player: p.id, index },
            hidden: true
          }
        })
      }),
      ...values(goldCoins).flatMap((c): LocatedCoin[] =>
        c.map(([id], index) => ({
          id,
          location: { type: LocationType.Treasure, z: index }
        }))
      ),
      {
        id: huntingMasterCoin,
        location: { type: LocationType.DistinctionsDeck, index: 1 }
      }
    ]
  }

  private initializeGems = (): LocatedGem[] => {
    const baseGems = Array.from(Gems.entries())
    const distinctionGem = baseGems.find(([, gem]) => gem === Gem6)!

    const forPlayerGems = baseGems.filter(([, gem]) => gem.value !== 6).slice(-this.options.players.length)
    const shuffledGems = shuffle(forPlayerGems)

    return [
      ...this.options.players.map((p, index): LocatedGem => {
        return {
          id: shuffledGems[index][0],
          location: { type: LocationType.PlayerBoard, player: p.id }
        }
      }),
      {
        id: distinctionGem[0],
        location: {
          type: LocationType.DistinctionsDeck,
          index: 1
        }
      }
    ]
  }

  private initializeHeroes = (): LocatedCard[] => {
    return Array.from(Heroes.entries()).map(
      ([id], index): LocatedCard => ({
        id,
        location: { type: LocationType.HeroesDeck, index }
      })
    )
  }

  private initializeDistinctions = (): LocatedCard[] => {
    return Array.from(Distinctions.entries()).map(
      ([id], index): LocatedCard => ({
        id,
        location: { type: LocationType.DistinctionsDeck, index }
      })
    )
  }

  private initializePlayers = (): Player[] => {
    return this.options.players.map((p) => ({
      id: p.id,
      effects: []
    }))
  }

  public getState = (): GameState => ({
    players: this.initializePlayers(),
    coins: this.initializeCoins(),
    gems: this.initializeGems(),
    cards: this.initializeAgeCards(),
    distinctions: this.initializeDistinctions(),
    heroes: this.initializeHeroes(),
    phase: Phase.TurnPreparation,
    step: Step.Bids,
    tavern: 0,
    round: 1
  })
}

export { GameInitializer }
