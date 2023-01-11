/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';
import { FC, Fragment, useMemo } from 'react';
import { Tavern } from '../../material/tavern/Tavern';
import { CoinToken } from '../../material/coin/CoinToken';
import keyBy from 'lodash/keyBy';
import { getCoinOnPlayerBoard, isOnPlayerBoard } from '@gamepark/nidavellir/utils/location.utils';
import { OnPlayerBoard } from '@gamepark/nidavellir/state/CommonLocations';
import GameView from '@gamepark/nidavellir/state/view/GameView';
import { Player } from '@gamepark/nidavellir/state/Player';

type PlayerPanelTavernsProps = {
  game: GameView;
  player: Player;
};

const PlayerPanelTaverns: FC<PlayerPanelTavernsProps> = (props) => {
  const { game, player } = props;
  const coins = useMemo(
    () =>
      keyBy(
        getCoinOnPlayerBoard(game, player.id).filter((c) => isOnPlayerBoard(c.location) && (c.location.index || 0) < 3),
        (c) => (c.location as OnPlayerBoard).index ?? 0
      ),
    [game.coins]
  );

  return (
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
  );
};

const tavern = (index: number) => css`
  position: absolute;
  top: 7.2em;
  left: ${index * 8.5 + 0.5}em;
  height: 7em;
  width: 7em;
`;

const tokenInPanel = css`
  height: 5em;
  width: 5em;
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

const tokenContainer = (index: number) => css`
  z-index: 10;
  position: absolute;
  top: 10em;
  left: ${index * 8.5 + 3.5}em;
  height: 6em;
  width: 6em;
  animation: ${animateBid} 1s ease-in-out forwards;
`;

export { PlayerPanelTaverns };
