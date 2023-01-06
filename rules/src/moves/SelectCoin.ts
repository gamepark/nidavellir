import GameView from '../state/view/GameView';

export const SET_SELECT_COIN = 'SelectCoin';
export type SelectCoin = {
  type: 'SelectCoin';
  coin?: number;
};

export const selectCoinMove = (coin?: number): SelectCoin => ({
  type: SET_SELECT_COIN,
  coin,
});

export const selectCoin = (game: GameView, move: SelectCoin) => {
  if (move.coin === undefined || game.selectedCoin === move.coin) {
    delete game.selectedCoin;
    return [];
  }

  game.selectedCoin = move.coin;

  return [];
};
