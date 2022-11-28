import { RandomMove, Rules, SecretInformation } from '@gamepark/rules-api';
import GameState from './state/GameState';
import GameView from './state/view/GameView';
import { isGameOptions, NidavellirOptions } from './NidavellirOptions';
import PlayerColor from './PlayerColor';
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

export default class Nidavellir
  extends Rules<GameState | GameView, Move, number>
  implements SecretInformation<GameView, Move, MoveView, number>, RandomMove<Move, MoveRandomized>
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

  delegate(): Rules<GameState | GameView, Move, number> | undefined {
    return getRules(this.state);
  }

  getAutomaticMoves(): Move[] {
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
  play(move: Move): void {
    if (this.state.nextMoves.length && this.state.nextMoves[0].type === move.type) {
      this.state.nextMoves.shift();
    }

    switch (move.type) {
      case MoveType.Pass:
        this.onPass();
        break;
    }

    super.play(move);
  }

  private onPass() {
    const activePlayer = getActivePlayer(this.state);
    if (activePlayer) {
      activePlayer.ready = true;
    }
  }

  /*private onMoveCard() {
    const cardByTavern = getCardByTavern(this.state);
    const drawnCards = this.state.cards.filter((c) => isInAgeDeck(c.location)).slice(0, cardByTavern * TAVERN_COUNT);

    drawnCards.forEach((c, index) => {
      c.location = {
        type: LocationType.Tavern,
        tavern: Math.floor(index / cardByTavern),
        index: index % cardByTavern,
      };
    });
  }*/

  /**
   * If you game has incomplete information, you must hide some of the game's state to the players and spectators.
   * @return What a person can see from the game state
   */
  getView(playerId?: number | undefined): GameView {
    // Cards will be hidden when in the age deck
    const ageCardWithoutSecret: SecretCard[] = this.state.cards.map((c) => {
      const hideSecret = c.location?.type === LocationType.Age1Deck || c.location.type === LocationType.Age2Deck;
      return hideSecret ? omit(c, 'id') : c;
    });

    // CoinMaterial will be hidden when chosen by the user at the auction phase
    const coinWithoutSecret: SecretCoin[] = this.state.coins.map((c) => {
      const hideSecret = c.location.type == LocationType.PlayerBoard && c.hidden && c.location.player !== playerId;
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
  getPlayerView(playerId: PlayerColor): GameView {
    return this.getView(playerId);
  }

  /**
   * If you game has incomplete information, sometime you need to alter a Move before it is sent to the players and spectator.
   * For example, if a card is revealed, the id of the revealed card should be ADDED to the Move in the MoveView
   * Sometime, you will hide information: for example if a player secretly choose a card, you will hide the card to the other players or spectators.
   *
   * @param move The move that has been played
   * @return What a person should know about the move that was played
   */
  getMoveView(move: Move): MoveView {
    return move;
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
  getPlayerMoveView(move: Move, _playerId: PlayerColor): MoveView {
    /*if (move.type === MoveType.DrawCard && move.playerId === playerId) {
      return {...move, card: this.state.deck[0]}
    }*/
    return move;
  }
}
