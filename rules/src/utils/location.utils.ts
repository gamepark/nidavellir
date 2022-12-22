import {
  CardLocation,
  InAgeDeck,
  InCommandZone,
  InDistinctionDeck,
  InHeroesDeck,
  InTavern,
  OnPlayerBoardCard,
} from '../state/LocatedCard';
import { LocationType } from '../state/Location';
import GameState from '../state/GameState';
import GameView from '../state/view/GameView';
import { CoinLocation, InTreasure } from '../state/LocatedCoin';
import { PlayerId } from '../state/Player';
import { InDiscard, InPlayerHand, OnPlayerBoard } from '../state/CommonLocations';
import { GemLocation } from '../state/LocatedGem';
import isEqual from 'lodash/isEqual';

export const isInTavern = (location: CardLocation): location is InTavern => location.type === LocationType.Tavern;
export const isInAge1Deck = (location: CardLocation): location is InAgeDeck => location.type === LocationType.Age1Deck;
export const isInAge2Deck = (location: CardLocation): location is InAgeDeck => location.type === LocationType.Age2Deck;
export const isInAgeDeck = (location: CardLocation): location is InAgeDeck =>
  isInAge1Deck(location) || isInAge2Deck(location);
export const isInPlayerHand = (location: CoinLocation | CardLocation): location is InPlayerHand =>
  location.type === LocationType.PlayerHand;
export const isOnPlayerBoard = (location: CoinLocation | GemLocation): location is OnPlayerBoard =>
  location.type === LocationType.PlayerBoard && location.player !== undefined;
export const isOnPlayerBoardCard = (location: CardLocation): location is OnPlayerBoardCard =>
  location.type === LocationType.PlayerBoard && location.player !== undefined;
export const isInTreasure = (location: CoinLocation): location is InTreasure => location.type === LocationType.Treasure;
export const isInDiscard = (location: CardLocation | CoinLocation): location is InDiscard =>
  location.type === LocationType.Discard;
export const isInHeroDeck = (location: CardLocation): location is InHeroesDeck =>
  location.type === LocationType.HeroesDeck;
export const isInCommandZone = (location: CardLocation): location is InCommandZone =>
  location.type === LocationType.CommandZone;
export const isInDistinctionDeck = (location: CardLocation): location is InDistinctionDeck =>
  location.type === LocationType.DistinctionsDeck;

export const getCardsInTavern = (state: GameState | GameView) => state.cards.filter((c) => isInTavern(c.location));
export const getCardsInAgeDeck = (state: GameState | GameView) => state.cards.filter((c) => isInAgeDeck(c.location));

export const getCoinsInPlayerHand = (state: GameState | GameView, playerId: PlayerId) =>
  state.coins.filter((c) => isInPlayerHand(c.location) && c.location.player === playerId);
export const getCoinOnPlayerBoard = (state: GameState | GameView, playerId: PlayerId) =>
  state.coins.filter((c) => isOnPlayerBoard(c.location) && c.location.player === playerId);

export const isSameCardLocation = (card1: CardLocation, card2: CardLocation): boolean => isEqual(card1, card2);

export const isSameCoinLocation = (coin1: CoinLocation, coin2: CoinLocation): boolean => isEqual(coin1, coin2);
