import GameState from '../state/GameState';
import GameView from '../state/view/GameView';
import { PlayerId } from '../state/Player';
import { getCoinOnPlayerBoard, getCoinsInPlayerHand } from './location.utils';
import times from 'lodash/times';
import keyBy from 'lodash/keyBy';
import { OnPlayerBoard } from '../state/CommonLocations';

export const getPlayerBidCombination = (state: GameState | GameView, playerId: PlayerId) => {
  const playerCoins = getCoinsInPlayerHand(state, playerId);
  const coinsOnBoard = keyBy(getCoinOnPlayerBoard(state, playerId), (c) => (c.location as OnPlayerBoard).index);
  return playerCoins.flatMap((coin) =>
    times(5, (num) => ({
      coin: coin.id,
      area: num,
    })).filter((move) => !coinsOnBoard[move.area])
  );
};
