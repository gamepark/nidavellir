import GameView from '../state/view/GameView';

export type SelectCoin = {
  type: 'SelectCoin';
  coin?: number;
};

export const selectCoinMove = (coin?: number): SelectCoin => ({
  type: 'SelectCoin',
  coin,
});

export const selectCoin = (game: GameView, move: SelectCoin) => {
  if (move.coin === undefined) {
    delete game.selectedCoin;
  }

  game.selectedCoin = move.coin;

  return [];
};
