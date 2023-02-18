import { RandomMove, Rules, SecretInformation, Undo } from '@gamepark/rules-api';
import GameState, { Step } from './state/GameState';
import GameView from './state/view/GameView';
import { isGameOptions, NidavellirOptions } from './NidavellirOptions';
import Move from './moves/Move';
import MoveView, { isView } from './moves/MoveView';
import { GameInitializer } from './initializer/GameInitializer';
import omit from 'lodash/omit';
import { SecretCard } from './state/view/SecretCard';
import { SecretCoin } from './state/view/SecretCoin';
import MoveRandomized from './moves/MoveRandomized';
import MoveType from './moves/MoveType';
import { PlayerId } from './state/Player';
import { MoveCard } from './moves/MoveCard';
import { MoveHero } from './moves/MoveHero';
import { MoveDistinction } from './moves/MoveDistinction';
import {
  isInAgeDeck,
  isInDiscard,
  isInPlayerHand,
  isInTavern,
  isInTreasure,
  isOnPlayerBoard,
  isSameCardLocation,
  isSameCoinLocation,
} from './utils/location.utils';
import { MoveGem } from './moves/MoveGem';
import { MoveCoin } from './moves/MoveCoin';
import { Pass } from './moves/Pass';
import { OnPlayerBoard } from './state/CommonLocations';
import { EffectsRules } from './effects/EffectsRules';
import { NidavellirRules } from './rules/NidavellirRules';
import shuffle from 'lodash/shuffle';
import { ScoringRules } from './rules/ScoringRules';
import { isAge1 } from './utils/age.utils';
import { Age1Rules } from './rules/Age1Rules';
import { Age2Rules } from './rules/Age2Rules';
import { ShuffleCoins } from './moves/ShuffleCoins';
import { getActivePlayer } from './utils/player.utils';

export default class Nidavellir
  extends Rules<GameState | GameView, Move | MoveView, PlayerId>
  implements
    SecretInformation<GameView, Move, MoveView, PlayerId>,
    RandomMove<Move, MoveRandomized>,
    Undo<GameView, Move, PlayerId>
{
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
      super(new GameInitializer(arg).getState());
    } else {
      super(arg);
    }
  }

  canUndo(): boolean {
    return true;
  }

  randomize(move: Move): Move & MoveRandomized {
    return move;
  }

  isOver(): boolean {
    return false;
  }

  delegates(): NidavellirRules[] {
    if (this.game.step === Step.Scoring) {
      return [new ScoringRules(this.game)];
    }
    const delegates = this.game.players
      .filter((p) => p.effects.length)
      .map((p) => new EffectsRules[p.effects[0].type](this.game, p));

    if (delegates.length) {
      return delegates;
    }

    if (isAge1(this.game)) {
      return [new Age1Rules(this.game)];
    }

    return [new Age2Rules(this.game)];
  }

  /**
   * This is the one and only play where you will update the game's state, depending on the move that has been played.
   *
   * @param move The move that should be applied to current state.
   */
  play(move: Move | MoveView) {
    switch (move.type) {
      case MoveType.MoveCard:
        this.onMoveCard(move);
        break;
      case MoveType.MoveHero:
        this.onMoveHero(move);
        break;
      case MoveType.MoveDistinction:
        this.onMoveDistinction(move);
        break;
      case MoveType.MoveCoin:
        this.onMoveCoin(move);
        break;
      case MoveType.MoveGem:
        this.onMoveGem(move);
        break;
      case MoveType.Pass:
        this.onPass(move);
        break;
      case MoveType.SetStep:
        this.game.step = move.step;
        break;
      case MoveType.ShuffleCoins:
        this.onShuffleCoins(move);
        break;
    }

    return super.play(move);
  }

  private onShuffleCoins(move: ShuffleCoins) {
    // Randomizing the new indexes for the coins since order must be hidden to the player
    const indexes = shuffle(Array.from(Array(move.coins.length)).map((_, index) => index));
    move.coins.forEach((c, index) => {
      const coin = this.game.coins.find((coin) => coin.id === c)!;
      if (isView(this.game)) {
        if (isInPlayerHand(coin.location)) {
          if (this.game.playerId !== coin.location.player) {
            coin.location.index = indexes[index];
            delete coin.id;
          }
        }
      }
    });
  }

  private onMoveCard(move: MoveCard) {
    if (move.id === undefined && move.source === undefined) {
      throw new Error(`It is impossible to move a card that is not known (no id or source set)`);
    }

    const card = this.game.cards.find((c) =>
      c.id !== undefined && move.id !== undefined ? move.id === c.id : isSameCardLocation(move.source!, c.location)
    );
    if (!card) {
      throw new Error(`Trying to move a card that does not exists: ${move.id}`);
    }

    if (move.id !== undefined) {
      card.id = move.id;
    }

    card.location = move.target;
  }

  private onMoveCoin(move: MoveCoin) {
    if (!move.source && move.id === undefined) {
      throw new Error(`Trying to move a coin but neither source or id are set`);
    }

    const coin = this.game.coins.find((c) =>
      c.id !== undefined && move.id !== undefined ? move.id === c.id : isSameCoinLocation(move.source!, c.location)
    );
    if (!coin) {
      throw new Error(`Trying to move a coin that does not exists: ${JSON.stringify(move)}`);
    }

    if (move.id !== undefined) {
      coin.id = move.id;
    }

    if (move.reveal) {
      coin.hidden = false;
    }

    if (move.target) {
      if ((isInTreasure(move.target) || isInDiscard(move.target)) && isOnPlayerBoard(coin.location)) {
        const player = this.game.players.find((p) => p.id === (coin.location as OnPlayerBoard).player)!;
        player.discardedCoin = {
          id: coin.id!,
          index: coin.location.index,
        };
      }
      coin.location = move.target;
    }
  }

  private onMoveGem(move: MoveGem) {
    const gem = this.game.gems.find((g) => move.id === g.id);
    if (!gem) {
      throw new Error(`Trying to move a gem that does not exists: ${move.id}`);
    }

    gem.location = move.target;
  }

  private onMoveHero(move: MoveHero) {
    const card = this.game.heroes.find((c) => move.id === c.id);
    if (!card) {
      throw new Error(`Trying to move a hero that does not exists: ${move.id}`);
    }

    card.location = move.target;
  }

  private onMoveDistinction(move: MoveDistinction) {
    const card = this.game.distinctions.find((c) => move.id === c.id);
    if (!card) {
      throw new Error(`Trying to move a distinction that does not exists: ${move.id}`);
    }

    card.location = move.target;
  }

  private onPass(move: Pass) {
    const player = this.game.players.find((p) => p.id === move.player)!;
    player.ready = true;
  }

  /**
   * If you game has incomplete information, you must hide some of the game's state to the players and spectators.
   * @return What a person can see from the game state
   */
  getView(playerId?: PlayerId | undefined): GameView {
    // Cards will be hidden when in the age deck
    const ageCardWithoutSecret: SecretCard[] = this.game.cards.map((c) => {
      const hideSecret = isInAgeDeck(c.location);
      return hideSecret ? omit(c, 'id') : c;
    });

    // CoinMaterial will be hidden when chosen by the user at the auction phase
    const coinWithoutSecret: SecretCoin[] = this.game.coins.map((c) => {
      const hideSecret =
        (isOnPlayerBoard(c.location) && c.hidden && c.location.player !== playerId) ||
        (isInPlayerHand(c.location) && c.location.player !== playerId);

      return hideSecret ? omit(c, 'id') : c;
    });

    return {
      ...this.game,
      cards: ageCardWithoutSecret,
      coins: coinWithoutSecret,
      view: true,
      playerId,
    };
  }

  /**
   * If you game has "SecretInformation", you must also implement "getPlayerView", returning the information visible by a specific player.
   * @param playerId Identifier of the player
   * @return what the player can see
   */
  getPlayerView(playerId: PlayerId): GameView {
    return this.getView(playerId);
  }

  /**
   * If you game has incomplete information, sometime you need to alter a Move before it is sent to the players and spectator.
   * For example, if a card is revealed, the id of the revealed card should be ADDED to the Move in the MoveView
   * Sometime, you will hide information: for example if a player secretly choose a card, you will hide the card to the other players or spectators.
   *
   * @param move The move that has been played
   * @param _playerId The player id
   * @return What a person should know about the move that was played
   */
  getMoveView(move: Move, _playerId?: PlayerId): MoveView {
    switch (move.type) {
      case MoveType.MoveCard:
        const card = this.game.cards.find((c) => c.id === move.id)!;
        if (isInTavern(move.target)) {
          return { ...move, source: card.location };
        }

        return move;
      case MoveType.TradeCoins: {
        const activePlayer = getActivePlayer(this.game);
        if (activePlayer.id === _playerId) {
          return move;
        }

        return {
          ...move,
          sources: move.ids.map((i) => this.game.coins.find((c) => c.id === i)!.location),
        };
      }
      case MoveType.MoveCoin:
        const coin = this.game.coins.find((c) => c.id === move.id)!;
        if (move.target) {
          if (isInPlayerHand(move.target)) {
            if (_playerId === move.target.player) {
              return move;
            } else {
              return { ...move, source: coin.location };
            }
          }

          if (isOnPlayerBoard(move.target)) {
            if (_playerId === move.target.player || !coin.hidden) {
              return move;
            } else {
              return { ...omit(move, 'id'), source: coin.location };
            }
          }
        }

        if (move.reveal) {
          return { ...move, source: coin.location };
        }

        return move;
      default:
        return move;
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
    return this.getMoveView(move, _playerId);
  }
}
