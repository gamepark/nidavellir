import GameState from "../state/GameState";
import GameView from "../state/view/GameView";
import {PlayerId} from "../state/Player";
import {getCoinsInPlayerHand} from "./location.utils";
import times from 'lodash/times';

export const getPlayerBidCombination = (state: GameState | GameView, playerId: PlayerId) => {
    const playerCoins = getCoinsInPlayerHand(state, playerId);
    return playerCoins.flatMap((coin) => times(5, (num) => ({ coin: coin.id, area: num - 1})))
}

