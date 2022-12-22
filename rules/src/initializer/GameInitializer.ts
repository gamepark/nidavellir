import { NidavellirOptions } from '../NidavellirOptions';
import GameState, { Phase, Step } from '../state/GameState';
import { Player } from '../state/Player';
import { LocatedCard } from '../state/LocatedCard';
import { LocatedCoin } from '../state/LocatedCoin';
import { LocatedGem } from '../state/LocatedGem';
import { Cards } from '../cards/Cards';
import { LocationType } from '../state/Location';
import shuffle from 'lodash/shuffle';
import { Distinctions } from '../cards/Distinctions';
import { Coins } from '../coins/Coins';
import { CoinColor } from '../coins/Coin';
import { Gems } from '../gems/Gems';
import { Heroes } from '../cards/Heroes';
import { getCardByTavern } from '../utils/tavern.utils';
import { TAVERN_COUNT } from '../utils/constants';
import values from 'lodash/values';
import groupBy from 'lodash/groupBy';
import partition from 'lodash/partition';

class GameInitializer {
  private options: NidavellirOptions;

  constructor(options: NidavellirOptions) {
    this.options = options;
  }

  private initializeAgeCards = (): LocatedCard[] => {
    const cards = Array.from(Cards.entries()).filter(
      ([, card]) => !card.minPlayers || this.options.players.length >= card.minPlayers
    );

    const [age1, age2] = partition(shuffle(cards), (c) => c[1].age === 1);

    const cardsByTavern = getCardByTavern(this.options.players.map((p) => p.id));
    const numberOfCard = cardsByTavern * TAVERN_COUNT;
    const drawnTavernCard = age1.splice(0, numberOfCard);
    return [
      ...drawnTavernCard.map(
        ([id], index): LocatedCard => ({
          id,
          location: {
            type: LocationType.Tavern,
            tavern: Math.floor(index / cardsByTavern),
            index: index % cardsByTavern,
          },
        })
      ),
      ...age1.map(
        ([id], index): LocatedCard => ({
          id,
          location: { type: LocationType.Age1Deck, index },
        })
      ),
      ...age2.map(
        ([id], index): LocatedCard => ({
          id,
          location: { type: LocationType.Age2Deck, index },
        })
      ),
    ];
  };

  private initializeCoins = (): LocatedCoin[] => {
    const coins = Array.from(Coins.entries());
    const goldCoins = groupBy(
      coins.filter((c) => c[1].color === CoinColor.Gold),
      (c) => c[1].value
    );
    const baseCoinsByValue: Record<number, any> = groupBy(
      coins.filter((c) => c[1].color === CoinColor.Bronze),
      (c) => c[1].value
    );

    return [
      ...this.options.players.flatMap((p, index) => {
        return [
          baseCoinsByValue[0][index],
          baseCoinsByValue[2][index],
          baseCoinsByValue[3][index],
          baseCoinsByValue[4][index],
          baseCoinsByValue[5][index],
        ].map(([id], index): LocatedCoin => {
          return {
            id,
            location: { type: LocationType.PlayerHand, player: p.id, index },
            hidden: true,
          };
        });
      }),
      ...values(goldCoins).flatMap((c): LocatedCoin[] =>
        c.map(([id], index) => ({
          id,
          location: { type: LocationType.Treasure, z: index },
        }))
      ),
    ];
  };

  private initializeGems = (): LocatedGem[] => {
    const baseGems = Array.from(Gems.entries())
      .filter(([, gem]) => gem.value !== 6)
      .slice(-this.options.players.length);
    const shuffledGems = shuffle(baseGems);

    return this.options.players.map((p, index): LocatedGem => {
      return {
        id: shuffledGems[index][0],
        location: { type: LocationType.PlayerBoard, player: p.id },
      };
    });
  };

  private initializeHeroes = (): LocatedCard[] => {
    return Array.from(Heroes.entries()).map(
      ([id], index): LocatedCard => ({
        id,
        location: { type: LocationType.HeroesDeck, index },
      })
    );
  };

  private initializeDistinctions = (): LocatedCard[] => {
    return Array.from(Distinctions.entries()).map(
      ([id], index): LocatedCard => ({
        id,
        location: { type: LocationType.DistinctionsDeck, index },
      })
    );
  };

  private initializePlayers = (): Player[] => {
    return this.options.players.map((p) => ({
      score: 0,
      id: p.id,
      effects: [],
    }));
  };

  public getState = (): GameState => ({
    players: this.initializePlayers(),
    coins: this.initializeCoins(),
    gems: this.initializeGems(),
    cards: this.initializeAgeCards(),
    distinctions: this.initializeDistinctions(),
    heroes: this.initializeHeroes(),
    phase: Phase.TurnPreparation,
    steps: [Step.Bids],
    nextMoves: [],
    tavern: 0,
    round: 1,
  });
}

export { GameInitializer };
