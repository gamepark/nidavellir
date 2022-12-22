/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { createContext, FC, useContext, useMemo } from 'react';
import { Player, PlayerId } from '@gamepark/nidavellir/state/Player';
import { usePlayerId } from '@gamepark/react-client';
import partition from 'lodash/partition';
import flatten from 'lodash/flatten';
import { BASE_SCALE } from '../material/Styles';
import { View, Views, ViewType } from '../material/View';

type TableContextValue = {
  placements: Record<number, number>;
  view: View;
};

export const TableContext = createContext<TableContextValue>({
  placements: [],
  view: { type: ViewType.GLOBAL, scale: BASE_SCALE },
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // Needed because only id matters
  }, [playerId]);
};

type TableContextProps = {
  placements: Record<number, number>;
  view: ViewType;
  views: Views;
};

const TableProvider: FC<TableContextProps> = (props) => {
  const { views, view, placements, children } = props;
  const currentView = views[view];

  return (
    <TableContext.Provider value={{ placements, view: currentView }}>
      <div
        css={[
          playingArea,
          view === ViewType.GLOBAL && globalView(currentView.scale),
          view === ViewType.TREASURE && treasureView(currentView.scale),
          view === ViewType.TAVERNS && tavernView(currentView.scale),
          view === ViewType.HEROES && heroesView(currentView.scale),
          /**currentView.type === ViewType.PLAYER &&
           playerViewStyle(playerBoardPositions[playerPlacement[currentView.player]], currentView.scale)*/
        ]}
      >
        {children}
      </div>
    </TableContext.Provider>
  );
};

// const playerViewStyle = (playerPlacement: any, scale: number) => {
//   return css`
//     transform: translate(${playerPlacement.viewPosition.left}em, ${playerPlacement.viewPosition.top}em)
//       ${playerPlacement.viewPosition.transform} scale(${scale});
//   `;
// };

const tavernView = (scale: number) => css`
  transform: translate(-221em, -151em) scale(${scale});
`;

const heroesView = (scale: number) => css`
  transform: translate(-380em, -150em) scale(${scale});
`;

const treasureView = (scale: number) => css`
  transform: translate(-60em, -154em) scale(${scale});
`;

const globalView = (scale: number) => css`
  transform: scale(${scale}) translate(-${((1 / BASE_SCALE - 1) * 100) / 2}%, -${((1 / BASE_SCALE - 1) * 100) / 2}%);
`;

const playingArea = css`
  position: absolute;
  width: ${(1 / BASE_SCALE) * 100}%;
  height: ${(1 / BASE_SCALE) * 100}%;
  transition: transform 1.5s, top 1.5s, left 1.5s, bottom 1.5s, right 1.5s;
  //transform-origin: top left;
`;

export { TableProvider };
