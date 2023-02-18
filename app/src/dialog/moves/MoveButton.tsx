/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import Move from '@gamepark/nidavellir/moves/Move';
import { FC } from 'react';
import MoveType from '@gamepark/nidavellir/moves/MoveType';
import { MoveCardButton } from './MoveCardButton';
import { usePlay } from '@gamepark/react-client';
import { greyBackground } from '../../material/Styles';
import { MoveCoinButton } from './MoveCoinButton';
import { MoveHeroButton } from './MoveHeroButton';
import GameView from '@gamepark/nidavellir/state/view/GameView';

type MoveButtonProps = {
  game: GameView;
  move: Move;
  onClick: () => void;
};

const MoveButtonTypes = {
  [MoveType.MoveCard]: MoveCardButton,
  [MoveType.MoveHero]: MoveHeroButton,
  [MoveType.MoveCoin]: MoveCoinButton,
  [MoveType.TradeCoins]: MoveCoinButton,
  [MoveType.TransformCoin]: MoveCoinButton,
};

const MoveButton: FC<MoveButtonProps> = (props) => {
  const { move, game, onClick } = props;
  const play = usePlay();

  const playMove = () => {
    play(move);
    onClick();
  };

  const Component = MoveButtonTypes[move.type];
  return (
    <div css={moveAction} onClick={playMove}>
      <Component move={move} game={game} />
    </div>
  );
};

const moveAction = css`
  flex: 40%;
  flex-shrink: 0;
  align-self: start;
  border: 0.3em solid black;
  border-radius: 2em;
  background-color: ${greyBackground};
  font-family: 'Norse', 'Arial', serif;
  font-weight: bold;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 1em 2em 1em 1em;
  //justify-self: start;

  &:hover,
  &:active {
    background-color: white;
  }
`;

export { MoveButton };
