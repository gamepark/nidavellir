/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Avatar } from '@gamepark/react-client';
import GameView from '@gamepark/nidavellir/state/view/GameView';
import { FC } from 'react';
import { playerPanelHeight, playerPanelsWidth } from '../material/Styles';
import { Player } from '@gamepark/nidavellir/state/Player';
import { PlayerPanelTaverns } from './panel/PlayerPanelTaverns';
import { PlayerPanelScore } from './panel/PlayerPanelScore';

type PlayerPanelProps = {
  player: Player;
  index: number;
  game: GameView;
  selected: boolean;
  onPanelClick: (playerId: number) => void;
};

const PlayerPanel: FC<PlayerPanelProps> = (props) => {
  const { player, index, selected, game, onPanelClick } = props;
  const { id } = player;

  return (
    <div css={[playerPanel(index), selected && selectedPanel]} onClick={() => onPanelClick(id)}>
      <Avatar playerId={id} css={avatarStyle} />
      <div css={playerName}>
        <span>Player #{id}</span>
      </div>
      <PlayerPanelTaverns game={game} player={player} />
      <PlayerPanelScore game={game} player={player} />
    </div>
  );
};

/*const discardedCoin = css`
  height: 5em;
  width: 5em;
  position: absolute;
  top: 1em;
  right: 1em;
  animation: ${animateBid} 1s ease-in-out forwards;
`;

const banCoin = css`
  ${discardedCoin};
  color: red;
  fill-opacity: 0.8;

  &:hover {
    fill-opacity: 0.1;
  }
`;*/

const avatarStyle = css`
  height: 5em;
  width: 5em;
  position: absolute;
  top: 1em;
  left: 1em;
`;

const playerName = css`
  position: absolute;
  top: 0.4em;
  left: 7em;

  > span {
    font-size: 3em;
    color: black;
    font-family: 'Norse', 'Arial', serif;
    font-weight: bold;
  }
`;

const playerPanel = (index: number) => css`
  position: absolute;
  top: ${1.5 + index * (1 + playerPanelHeight)}em;
  left: 1em;
  height: ${playerPanelHeight}em;
  width: ${playerPanelsWidth - 2}em;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 1em;
  cursor: pointer;
  border: 0.2em solid black;
`;

const selectedPanel = css`
  background-color: rgba(255, 255, 255, 1);
`;

export { PlayerPanel };
