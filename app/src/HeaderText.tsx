/** @jsxImportSource @emotion/react */
import { usePlayerId } from '@gamepark/react-client';
import { useTranslation } from 'react-i18next';
import GameView from '@gamepark/nidavellir/state/view/GameView';
import { isEndOfGame } from '@gamepark/nidavellir/utils/age.utils';
import maxBy from 'lodash/maxBy';

type Props = {
  loading: boolean;
  game?: GameView;
};

export default function HeaderText({ loading, game }: Props) {
  const { t } = useTranslation();
  const playerId = usePlayerId();
  if (loading || !game) return <>{t('Game loading...')}</>;

  if (isEndOfGame(game) && game.players.every((p) => p.score !== undefined)) {
    const winner = maxBy(game.players, (p) => p.score)!;
    if (winner.id === playerId) {
      return <>End of the game. You win the game with {winner.score} points.</>;
    }
    return (
      <>
        End of the game. Player #{winner.id} wins the game with {winner.score} points.
      </>
    );
  }
  return (
    <>
      Loaded! Now what? Your player id is {playerId}. Round: {game.round}
    </>
  );
}
