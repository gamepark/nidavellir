/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';
import { Avatar } from '@gamepark/react-client';
import GameView from '@gamepark/nidavellir/state/view/GameView';
import { FC, Fragment, useMemo } from 'react';
import { playerPanelHeight, playerPanelsWidth } from '../material/Styles';
import { Player } from '@gamepark/nidavellir/state/Player';
import { getCoinOnPlayerBoard, isOnPlayerBoard } from '@gamepark/nidavellir/utils/location.utils';
import { Tavern } from '../material/tavern/Tavern';
import { InDiscard, OnPlayerBoard } from '@gamepark/nidavellir/state/CommonLocations';
import { CoinToken } from '../material/coin/CoinToken';
import keyBy from 'lodash/keyBy';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan } from '@fortawesome/free-solid-svg-icons/faBan';

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
  const coins = useMemo(
    () =>
      keyBy(
        getCoinOnPlayerBoard(game, id).filter((c) => isOnPlayerBoard(c.location) && (c.location.index || 0) < 3),
        (c) => (c.location as OnPlayerBoard).index ?? 0
      ),
    [game.coins]
  );

  return (
    <div css={[playerPanel(index), selected && selectedPanel]} onClick={() => onPanelClick(id)}>
      <Avatar playerId={id} css={avatarStyle} />
      <div css={playerName}>
        <span>Player #{id}</span>
      </div>
      <div css={coins}>
        {[0, 1, 2].map((index) => {
          return (
            <Fragment key={index}>
              <Tavern tavern={index} css={tavern(index)} />
              {!!coins[index] && (
                <div css={tokenContainer(index)}>
                  <CoinToken coin={coins[index]} css={tokenInPanel} />
                </div>
              )}
            </Fragment>
          );
        })}
      </div>
      {!!player.discarded?.coin && (
        <>
          {/* FIXME: display coin even if not located (maybe store the location in the discarded props) ?*/}
          <CoinToken coin={{ location: {} as InDiscard, id: player.discarded?.coin! }} css={discardedCoin} />
          <FontAwesomeIcon icon={faBan} css={banCoin} />
        </>
      )}
    </div>
  );
};

const tavern = (index: number) => css`
  position: absolute;
  top: 7.2em;
  left: ${index * 11 + 2}em;
  height: 8em;
  width: 8em;
`;

const tokenInPanel = css`
  height: 6em;
  width: 6em;
  pointer-events: none;
`;

const animateBid = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const discardedCoin = css`
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
`;

const tokenContainer = (index: number) => css`
  z-index: 10;
  position: absolute;
  top: 10em;
  left: ${index * 11 + 6}em;
  height: 6em;
  width: 6em;
  animation: ${animateBid} 1s ease-in-out forwards;
`;

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
