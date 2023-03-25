/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC, Fragment } from 'react';
import { playerPanelsHeight, playerPanelsWidth } from '../material/Styles';
import GameView from '@gamepark/nidavellir/state/view/GameView';
import { View } from '../material/View';
import { PlayerPanel } from './PlayerPanel';
import { AnimationPreviews } from '../preview/AnimationPreviews';

type PlayerPanelsProps = {
  game: GameView;
  view?: View;
  onPanelClick: (playerId: number) => void;
};

const PlayerPanels: FC<PlayerPanelsProps> = (props) => {
  const { game, view, onPanelClick } = props;
  return (
    <div css={playersArea}>
      {game.players.map((p, index) => (
        <Fragment key={p.id}>
          <AnimationPreviews game={game} player={p.id} view={view} />
          <PlayerPanel
            key={p.id}
            player={p}
            index={index}
            game={game}
            selected={p.id === view?.player}
            onPanelClick={onPanelClick}
          />
        </Fragment>
      ))}
    </div>
  );
};

const playersArea = css`
  position: absolute;
  right: 0;
  height: ${playerPanelsHeight}em;
  width: ${playerPanelsWidth}em;
  //background-color: goldenrod;
  transform: translateY(-50%);
  top: calc(7em + 46.5%);
`;

export { PlayerPanels };
