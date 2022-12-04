import { Player, PlayerId } from '../state/Player';
import GameState from '../state/GameState';
import GameView from '../state/view/GameView';
import Move from '../moves/Move';
import MoveView from '../moves/MoveView';
import { NidavellirRules } from '../rules/NidavellirRules';

export default abstract class EffectRules extends NidavellirRules {
  player: Player;

  constructor(game: GameState | GameView, player: Player) {
    super(game);
    this.player = player;
  }

  isTurnToPlay(playerId: PlayerId): boolean {
    return playerId === this.player.id;
  }

  getLegalMoves(playerId: PlayerId): (Move | MoveView)[] {
    return playerId === this.player.id ? this.getPlayerMoves() : [];
  }

  getPlayerMoves(): (Move | MoveView)[] {
    return [];
  }
}
