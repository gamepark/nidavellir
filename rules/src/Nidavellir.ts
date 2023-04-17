import { Action, RandomMove, Rules, SecretInformation, Undo } from '@gamepark/rules-api'
import GameState, { Step } from './state/GameState'
import GameView from './state/view/GameView'
import { isGameOptions, NidavellirOptions } from './NidavellirOptions'
import Move from './moves/Move'
import MoveView, { isView } from './moves/MoveView'
import { GameInitializer } from './initializer/GameInitializer'
import omit from 'lodash/omit'
import { SecretCard } from './state/view/SecretCard'
import { SecretCoin } from './state/view/SecretCoin'
import MoveRandomized from './moves/MoveRandomized'
import MoveType from './moves/MoveType'
import { PlayerId } from './state/Player'
import { MoveCard } from './moves/MoveCard'
import { MoveHero } from './moves/MoveHero'
import { MoveDistinction } from './moves/MoveDistinction'
import {
  isInAgeDeck,
  isInArmy,
  isInDiscard,
  isInPlayerHand,
  isInTavern,
  isInTreasure,
  isOnPlayerBoard,
  isSameCardLocation,
  isSameCoinLocation
} from './utils/location.utils'
import { MoveGem } from './moves/MoveGem'
import { MoveCoin } from './moves/MoveCoin'
import { Pass } from './moves/Pass'
import { EffectsRules } from './effects/EffectsRules'
import { NidavellirRules } from './rules/NidavellirRules'
import { ScoringRules } from './rules/ScoringRules'
import { isAge1, isEndOfGame } from './utils/age.utils'
import { Age1Rules } from './rules/Age1Rules'
import { Age2Rules } from './rules/Age2Rules'
import { ShuffleCoinsRandomized } from './moves/ShuffleCoins'
import { getActivePlayer } from './utils/player.utils'
import { Cards } from './cards/Cards'
import shuffle from 'lodash/shuffle'
import { TroopEvaluationRules } from './rules/TroopEvaluationRules'
import { LocationType } from './state/Location'

export default class Nidavellir
  extends Rules<GameState | GameView, Move | MoveView, PlayerId>
  implements SecretInformation<GameView, Move, MoveView, PlayerId>,
    RandomMove<Move, MoveRandomized>,
    Undo<GameView, Move, PlayerId> {
  /**
   * This constructor is called when the game "restarts" from a previously saved state.
   * @param state The state of the game
   */
  constructor(state: GameState | GameView);
  /**
   * This constructor is called when a new game is created. If your game has options, or a variable number of players, it will be provided here.
   * @param options The options of the new game
   */
  constructor(options: NidavellirOptions);
  /**
   * In here you must code the construction of your class. Use a "typeguard" to distinguish a new game from a restored game.
   * @param arg The state of the game, or the options when starting a new game
   */
  constructor(arg: GameState | GameView | NidavellirOptions) {
    if (isGameOptions(arg)) {
      super(new GameInitializer(arg).getState())
    } else {
      super(arg)
    }
  }

  canUndo(action: Action<Move, PlayerId>, consecutiveActions: Action<Move, PlayerId>[]): boolean {
    return action.move.type !== MoveType.Pass
      && this.isCancellable(action.move)
      && action.consequences.every((move) => this.isCancellable(move))
      && (!consecutiveActions.length || this.game.step === Step.Bids)
  }

  isCancellable(move: Move): boolean {
    if (move.type === MoveType.MoveCoin) {
      return !move.reveal
    }

    if (move.type === MoveType.MoveCard) {
      return move.target.type !== LocationType.Age1Deck && move.target.type !== LocationType.Age2Deck
    }

    return true
  }

  randomize(move: Move): Move & MoveRandomized {
    if (move.type === MoveType.ShuffleCoins) {
      return ({
        ...move,
        shuffledCoins: shuffle(move.coins)
      })
    }

    return move
  }

  isOver(): boolean {
    return isEndOfGame(this.game)
  }

  delegates(): NidavellirRules[] {
    if (this.game.step === Step.Scoring) {
      return [new ScoringRules(this.game)]
    }

    const delegates = this.game.players
      .filter((p) => p.effects.length)
      .map((p) => new EffectsRules[p.effects[0].type](this.game, p))

    if (delegates.length) {
      if (this.game.step === Step.TroopEvaluation) {
        return [...delegates, new TroopEvaluationRules(this.game)]
      }

      return delegates
    }

    if (isAge1(this.game)) {
      return [new Age1Rules(this.game)]
    }

    return [new Age2Rules(this.game)]
  }

  /**
   * This is the one and only play where you will update the game's state, depending on the move that has been played.
   *
   * @param move The move that should be applied to current state.
   */
  play(move: MoveRandomized) {
    switch (move.type) {
      case MoveType.MoveCard:
        this.onMoveCard(move)
        break
      case MoveType.MoveHero:
        this.onMoveHero(move)
        break
      case MoveType.MoveDistinction:
        this.onMoveDistinction(move)
        break
      case MoveType.MoveCoin:
        this.onMoveCoin(move)
        break
      case MoveType.MoveGem:
        this.onMoveGem(move)
        break
      case MoveType.Pass:
        this.onPass(move)
        break
      case MoveType.SetStep:
        this.game.step = move.step
        break
      case MoveType.ShuffleCoins:
        this.onShuffleCoins(move)
        break
    }

    return super.play(move)
  }

  private onShuffleCoins(move: ShuffleCoinsRandomized) {
    const indexes = move.coins.map((c) => this.game.coins.findIndex((coin) => coin.id === c))
    const shuffledCoins = move.shuffledCoins.map((c) => this.game.coins.find((coin) => coin.id === c)!.location)
    indexes.forEach((indexToMove, index) => {
      const location = shuffledCoins[index]
      if (!isView(this.game)) {
        this.game.coins[indexToMove].location = location
      } else if (isInPlayerHand(location) && location.player !== this.game.playerId) {
        delete this.game.coins[indexToMove].id
      }
    })
  }

  private onMoveCard(move: MoveCard & { age?: number }) {
    if (move.id === undefined && move.source === undefined) {
      throw new Error(`It is impossible to move a card that is not known (no id or source set)`)
    }

    const card = this.game.cards.find((c) =>
      c.id !== undefined && move.id !== undefined ? move.id === c.id : isSameCardLocation(move.source!, c.location)
    )
    if (!card) {
      throw new Error(`Trying to move a card that does not exists: ${ move.id }`)
    }

    if (move.id !== undefined) {
      card.id = move.id
    }

    if (move.age) {
      card.age = move.age
    } else if (card.id !== undefined) {
      card.age = Cards[card.id].age
    }

    if (isInArmy(card.location) && isInDiscard(move.target)) {
      const player = this.game.players.find((p) => p.id === move.player)!

      player.discardedCard = {
        id: card.id!,
        origin: card.location
      }
    }

    if (isInAgeDeck(move.target) && isView(this.game)) {
      delete card.id
      // TODO: let the id, but add  "hidden" flag
    }

    card.location = move.target
  }

  private onMoveCoin(move: MoveCoin) {
    if (!move.source && move.id === undefined) {
      throw new Error(`Trying to move a coin but neither source or id are set`)
    }

    const coin = this.game.coins.find((c) => {
        return c.id !== undefined && move.id !== undefined ? move.id === c.id : isSameCoinLocation(move.source!, c.location)
      }
    )
    if (!coin) {
      throw new Error(`Trying to move a coin that does not exists: ${ JSON.stringify(move) }`)
    }

    if (move.id !== undefined) {
      coin.id = move.id
    }

    if (move.reveal) {
      coin.hidden = false
    }

    if (move.hide) {
      coin.hidden = true

      // Not a perfect solution but needed to avoid issues on reload
      if (move.target && (move.target as any).player !== undefined && isView(this.game) && this.game.playerId !== (move.target as any).player) {
        delete coin.id
      }
    }

    if (move.target) {
      if ((isInTreasure(move.target) || isInDiscard(move.target)) && isOnPlayerBoard(coin.location)) {
        const player = this.game.players.find((p) => p.id === move.player)!
        player.discardedCoin = {
          id: coin.id!,
          index: coin.location.index
        }
      }
      coin.location = move.target
    }
  }

  private onMoveGem(move: MoveGem) {
    const gem = this.game.gems.find((g) => move.id === g.id)
    if (!gem) {
      throw new Error(`Trying to move a gem that does not exists: ${ move.id }`)
    }

    gem.location = move.target
  }

  private onMoveHero(move: MoveHero) {
    const card = this.game.heroes.find((c) => move.id === c.id)
    if (!card) {
      throw new Error(`Trying to move a hero that does not exists: ${ move.id }`)
    }

    card.location = move.target
  }

  private onMoveDistinction(move: MoveDistinction) {
    const card = this.game.distinctions.find((c) => move.id === c.id)
    if (!card) {
      throw new Error(`Trying to move a distinction that does not exists: ${ move.id }`)
    }

    card.location = move.target
  }

  private onPass(move: Pass) {
    const player = this.game.players.find((p) => p.id === move.player)!
    player.ready = true
  }

  /**
   * If you game has incomplete information, you must hide some of the game's state to the players and spectators.
   * @return What a person can see from the game state
   */
  getView(playerId?: PlayerId | undefined): GameView {
    // Cards will be hidden when in the age deck
    const ageCardWithoutSecret: SecretCard[] = this.game.cards.map((c) => {
      const hideSecret = isInAgeDeck(c.location) || (isInPlayerHand(c.location) && playerId !== c.location.player)
      return hideSecret ? omit(c, 'id') : c
    })

    // CoinMaterial will be hidden when chosen by the user at the auction phase
    const coinWithoutSecret: SecretCoin[] = this.game.coins.map((c) => {
      const hideSecret =
        (isOnPlayerBoard(c.location) && c.hidden && c.location.player !== playerId) ||
        (isInPlayerHand(c.location) && c.location.player !== playerId)

      return hideSecret ? omit(c, 'id') : c
    })

    return {
      ...this.game,
      cards: ageCardWithoutSecret,
      coins: coinWithoutSecret,
      view: true,
      playerId
    }
  }

  /**
   * If you game has "SecretInformation", you must also implement "getPlayerView", returning the information visible by a specific player.
   * @param playerId Identifier of the player
   * @return what the player can see
   */
  getPlayerView(playerId: PlayerId): GameView {
    return this.getView(playerId)
  }

  /**
   * If you game has incomplete information, sometime you need to alter a Move before it is sent to the players and spectator.
   * For example, if a card is revealed, the id of the revealed card should be ADDED to the Move in the MoveView
   * Sometime, you will hide information: for example if a player secretly choose a card, you will hide the card to the other players or spectators.
   *
   * @param move The move that has been played
   * @param playerId The player id
   * @return What a person should know about the move that was played
   */
  getMoveView(move: Move, playerId?: PlayerId): MoveView {
    switch (move.type) {
      case MoveType.MoveCard:
        const card = this.game.cards.find((c) => c.id === move.id)!
        if (move.reveal) {
          if (isInPlayerHand(card.location) && card.location.player !== playerId) {
            return { ...move, source: card.location }
          }
        }

        if (isInTavern(move.target)) {
          return { ...move, source: card.location }
        }

        if ((isInPlayerHand(move.target) && playerId !== move.target.player)
          || (isInPlayerHand(card.location) && isInAgeDeck(move.target) && playerId !== card.location.player)) {
          return { ...omit(move, 'id'), source: card.location, age: Cards[card.id!].age }
        }

        return move
      case MoveType.TradeCoins: {
        const activePlayer = getActivePlayer(this.game)
        if (activePlayer.id === playerId) {
          return move
        }

        return {
          ...move,
          sources: move.ids.map((i: number) => this.game.coins.find((c) => c.id === i)!.location)
        }
      }
      case MoveType.TransformCoin: {
        const coin = this.game.coins.find((c) => c.id === move.id)!
        if ((isInPlayerHand(coin.location) || isOnPlayerBoard(coin.location)) && coin.location.player === playerId) {
          return move
        }

        return {
          ...move,
          source: this.game.coins.find((c) => c.id === move.id)!.location
        }
      }
      case MoveType.MoveCoin:
        const coin = this.game.coins.find((c) => {
          return c.id === move.id
        })!
        if (move.target) {
          if (isInPlayerHand(move.target)) {
            if (playerId === move.target.player) {
              return move
            } else {
              return { ...move, source: coin.location }
            }
          }

          if (isOnPlayerBoard(move.target)) {
            if (playerId === move.target.player || !coin.hidden) {
              return move
            } else {
              if (move.reveal) {
                return { ...move, source: coin.location }
              }

              return { ...omit(move, 'id'), source: coin.location }
            }
          }
        }

        if (move.reveal) {
          return { ...move, source: coin.location }
        }

        return move
      default:
        return move
    }
  }

  /**
   * If you game has secret information, sometime you need to alter a Move depending on which player it is.
   * For example, if a card is drawn, the id of the revealed card should be ADDED to the Move in the MoveView, but only for the played that draws!
   * Sometime, you will hide information: for example if a player secretly choose a card, you will hide the card to the other players or spectators.
   *
   * @param move The move that has been played
   * @param _playerId Identifier of the player seeing the move
   * @return What a person should know about the move that was played
   */
  getPlayerMoveView(move: Move, _playerId: PlayerId): MoveView {
    return this.getMoveView(move, _playerId)
  }
}
