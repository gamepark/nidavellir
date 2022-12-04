import { RandomMove, Rules, SecretInformation } from '@gamepark/rules-api';
import GameState from './state/GameState';
import GameView from './state/view/GameView';
import { isGameOptions, NidavellirOptions } from './NidavellirOptions';
import Move from './moves/Move';
import MoveView from './moves/MoveView';
import { GameInitializer } from './initializer/GameInitializer';
import omit from 'lodash/omit';
import { LocationType } from './state/Location';
import { SecretCard } from './state/view/SecretCard';
import { SecretCoin } from './state/view/SecretCoin';
import { getRules } from './utils/rule.utils';
import MoveRandomized from './moves/MoveRandomized';
import MoveType from './moves/MoveType';
import { getActivePlayer } from './utils/player.utils';
import { PlayerId } from './state/Player';
import { MoveCard, MoveCardInView } from './moves/MoveCard';
import { MoveHero } from './moves/MoveHero';
import { MoveDistinction } from './moves/MoveDistinction';
import { isInAgeDeck, isInPlayerHand } from './utils/location.utils';
import { MoveGem } from './moves/MoveGem';

export default class Nidavellir
  extends Rules<GameState | GameView, Move | MoveView, PlayerId>
  implements SecretInformation<GameView, Move, MoveView, PlayerId>, RandomMove<Move, MoveRandomized>
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

  randomize(move: Move): Move & MoveRandomized {
    return move;
  }

  delegate(): Rules<GameState | GameView, Move | MoveView, number> | undefined {
    return getRules(this.state);
  }

  getAutomaticMoves(): (Move | MoveView)[] {
    if (this.state.nextMoves.length) {
      return [this.state.nextMoves[0]];
    }

    return super.getAutomaticMoves();
  }

  /**
   * This is the one and only play where you will update the game's state, depending on the move that has been played.
   *
   * @param move The move that should be applied to current state.
   */
  play(move: Move | MoveView): void {
    if (this.state.nextMoves.length && this.state.nextMoves[0].type === move.type) {
      this.state.nextMoves.shift();
    }

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
      case MoveType.MoveGem:
        this.onMoveGem(move);
        break;
      case MoveType.Pass:
        this.onPass();
        break;
    }

    super.play(move);
  }

  private onMoveCard(move: MoveCard) {
    const card = this.state.cards.find((c) => move.id === c.id);
    if (!card) {
      throw new Error(`Trying to move a card that does not exists: ${move.id}`);
    }

    card.location = move.target;
  }

  private onMoveGem(move: MoveGem) {
    const gem = this.state.gems.find((g) => move.id === g.id);
    if (!gem) {
      throw new Error(`Trying to move a gem that does not exists: ${move.id}`);
    }

    gem.location = move.target;
  }

  private onMoveHero(move: MoveHero) {
    const card = this.state.heroes.find((c) => move.id === c.id);
    if (!card) {
      throw new Error(`Trying to move a hero that does not exists: ${move.id}`);
    }

    card.location = move.target;
  }

  private onMoveDistinction(move: MoveDistinction) {
    const card = this.state.distinctions.find((c) => move.id === c.id);
    if (!card) {
      throw new Error(`Trying to move a distinction that does not exists: ${move.id}`);
    }

    card.location = move.target;
  }

  private onPass() {
    const activePlayer = getActivePlayer(this.state);
    if (activePlayer) {
      activePlayer.ready = true;
    }
  }

  /**
   * If you game has incomplete information, you must hide some of the game's state to the players and spectators.
   * @return What a person can see from the game state
   */
  getView(playerId?: PlayerId | undefined): GameView {
    // Cards will be hidden when in the age deck
    const ageCardWithoutSecret: SecretCard[] = this.state.cards.map((c) => {
      const hideSecret = isInAgeDeck(c.location);
      return hideSecret ? omit(c, 'id') : c;
    });

    // CoinMaterial will be hidden when chosen by the user at the auction phase
    const coinWithoutSecret: SecretCoin[] = this.state.coins.map((c) => {
      const hideSecret =
        ((c.location.type === LocationType.PlayerBoard && c.hidden) || c.location.type === LocationType.PlayerHand) &&
        c.location.player !== playerId;
      return hideSecret ? omit(c, 'id') : c;
    });

    return {
      ...this.state,
      cards: ageCardWithoutSecret,
      coins: coinWithoutSecret,
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
        return move as MoveCardInView;
      case MoveType.MoveCoin:
        const coin = this.state.coins.find((c) => c.id === move.id)!;
        return isInPlayerHand(coin.location) && coin.location.player === _playerId ? move : omit(move, 'id');
      case MoveType.RevealCoin:
        return { ...move, ...this.state.coins.find((c) => c.id === move.id)! };
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
