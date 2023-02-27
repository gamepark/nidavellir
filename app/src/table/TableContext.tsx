/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { createContext, FC, useContext, useMemo } from 'react';
import { Player, PlayerId } from '@gamepark/nidavellir/state/Player';
import { usePlayerId } from '@gamepark/react-client';
import partition from 'lodash/partition';
import flatten from 'lodash/flatten';
import { BASE_SCALE, playerBoardPositions } from '../material/Styles';
import { View, ViewType } from '../material/View';

type TableContextValue = {
  placements: Record<number, number>;
  view?: View;
};

export const TableContext = createContext<TableContextValue>({
  placements: [],
  view: undefined,
});
export const usePlayerPositions = () => useContext(TableContext).placements;
export const useCameraView = () => useContext(TableContext).view;
export const useDisplayedPlayers = (players: Player[]): PlayerId[] => {
  const playerId = usePlayerId();
  return useMemo(() => {
    if (playerId === undefined) {
      return players.map((p) => p.id);
    }

    return flatten(partition(players, (p) => p.id === playerId)).map((p) => p.id);
    // Needed because only id matters
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playerId]);
};

type TableContextProps = {
  placements: Record<number, number>;
  view: View;
  views: View[];
};

const TableProvider: FC<TableContextProps> = (props) => {
  const { view, placements, children } = props;
  const value = { placements, view };
  return (
    <TableContext.Provider value={value}>
      <div
        css={[
          playingArea,
          view.type === ViewType.GLOBAL && globalView(view.scale),
          view.type === ViewType.TREASURE && treasureView(view.scale),
          view.type === ViewType.TAVERNS && tavernView(view.scale),
          view.type === ViewType.HEROES && heroesView(view.scale),
          view.type === ViewType.PLAYER && playerViewStyle(playerBoardPositions[placements[view.player]], view.scale),
        ]}
      >
        {children}
      </div>
    </TableContext.Provider>
  );
};

const playerViewStyle = (playerPlacement: any, scale: number) => {
  return css`
    transform: translate3d(${playerPlacement.viewPosition.left}em, ${playerPlacement.viewPosition.top}em, 0em)
      ${playerPlacement.viewPosition.transform} scale(${scale});
  `;
};

const tavernView = (scale: number) => css`
  transform: translate3d(-221em, -151em, 0em) scale(${scale});
`;

const heroesView = (scale: number) => css`
  transform: translate3d(-380em, -150em, 0em) scale(${scale});
`;

const treasureView = (scale: number) => css`
  transform: translate3d(-65em, -151em, 0em) scale(${scale});
`;

const globalView = (scale: number) => css`
  transform: scale(${scale})
    translate3d(-${((1 / BASE_SCALE - 1) * 100) / 2}%, -${((1 / BASE_SCALE - 1) * 100) / 2}%, 0em);
`;

const playingArea = css`
  position: absolute;
  width: ${(1 / BASE_SCALE) * 100}%;
  height: ${(1 / BASE_SCALE) * 100}%;
  transition: transform 1s;
  transform-style: preserve-3d;
  will-change: transform;
`;

export { TableProvider };
