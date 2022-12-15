/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { createContext, FC, useContext, useMemo, useState } from 'react';
import { Player } from '@gamepark/nidavellir/state/Player';
import { usePlay, usePlayerId } from '@gamepark/react-client';
import partition from 'lodash/partition';
import flatten from 'lodash/flatten';
import { GRID_SIZE, playerBoardPositions, treasureTop } from '../material/Styles';
import { View, ViewType } from '../material/View';
import { passMove } from '@gamepark/nidavellir/moves/Pass';

type TableContextValue = {
  playerPlacement: Record<number, number>;
  view: View;
};

export const TableContext = createContext<TableContextValue>({
  playerPlacement: [],
  view: { type: ViewType.GLOBAL, scale: 1 / GRID_SIZE },
});
export const usePlayerPositions = () => useContext(TableContext).playerPlacement;
export const useCameraView = () => useContext(TableContext).view;
export const useDisplayedPlayers = (players: Player[]): Player[] => {
  const playerId = usePlayerId();
  return useMemo(() => {
    if (playerId === undefined) {
      return players;
    }

    return flatten(partition(players, (p) => p.id === playerId));
  }, [players, playerId]);
};

type TableContextProps = {
  players: Player[];
};

const TableProvider: FC<TableContextProps> = ({ players, children }) => {
  const playerPlacement = useMemo(() => {
    switch (players.length) {
      case 2:
        return { [players[0].id]: 0, [players[1].id]: 3 };
      case 3:
        return { [players[0].id]: 0, [players[1].id]: 1, [players[2].id]: 3 };
      case 4:
        return { [players[0].id]: 0, [players[1].id]: 1, [players[2].id]: 3, [players[3].id]: 4 };
      default:
        return { [players[0].id]: 0, [players[1].id]: 1, [players[2].id]: 2, [players[3].id]: 3, [players[4].id]: 4 };
    }
  }, [players]);
  const [view, setView] = useState<View>({ type: ViewType.GLOBAL, scale: 1 / GRID_SIZE });

  // TODO: REMOVE IT FROM THIS COMPONENT
  const play = usePlay();
  const playerId = usePlayerId();

  const playerKeys = Object.keys(playerPlacement);
  const views = [
    { type: ViewType.GLOBAL, label: 'Global', scale: 1 / GRID_SIZE },
    ...playerKeys.map((k) => ({ type: ViewType.PLAYER, player: k, label: `Player #${k}`, scale: 1 })),
    { type: ViewType.TAVERNS, label: 'Taverns', scale: 0.8 },
    { type: ViewType.HEROES, label: 'Heroes', scale: 0.8 },
    { type: ViewType.TREASURE, label: 'Treasure', scale: 0.8 },
  ];
  return (
    <TableContext.Provider value={{ playerPlacement, view }}>
      <div
        css={[
          playingArea,
          view.type === ViewType.GLOBAL && globalView(view.scale),
          view.type === ViewType.TREASURE && treasureView(view.scale),
          view.type === ViewType.TAVERNS && tavernView(view.scale),
          view.type === ViewType.HEROES && heroesView(view.scale),
          view.type === ViewType.PLAYER &&
            playerViewStyle(playerBoardPositions[playerPlacement[view.player]], view.scale),
        ]}
      >
        {children}
      </div>
      {views.map((v, index) => {
        return (
          <button
            key={index}
            css={css`
              position: absolute;
              top: ${index * 9 + 5}em;
              left: 0;
              width: 7em;
              height: 7em;
              border-radius: 0 50% 50% 0;
            `}
            onClick={() => setView(v)}
          >
            {v.label}
          </button>
        );
      })}
      <button
        key="pass"
        css={css`
          position: absolute;
          top: ${views.length * 9 + 5}em;
          left: 0;
          width: 7em;
          height: 7em;
          border-radius: 0 50% 50% 0;
        `}
        onClick={() => play(passMove(playerId))}
      >
        Pass
      </button>
    </TableContext.Provider>
  );
};

const playerViewStyle = (playerPlacement: any, scale: number) => {
  return css`
    transform: translate(${playerPlacement.viewPosition.left}em, ${playerPlacement.viewPosition.top}em)
      ${playerPlacement.viewPosition.transform} scale(${scale});
  `;
};

const tavernView = (scale: number) => css`
  transform: translate(-210em, -116em) scale(${scale});
`;

const heroesView = (scale: number) => css`
  transform: translate(-382em, -116em) scale(${scale});
`;

const treasureView = (scale: number) => css`
  transform: translate(-50em, -${treasureTop - 40}em) scale(${scale});
`;

const globalView = (scale: number) => css`
  transform: scale(${scale}) translate(-${((GRID_SIZE - 1) * 100) / 2}%, -${((GRID_SIZE - 1) * 100) / 2}%);
`;

const playingArea = css`
  position: absolute;
  width: ${GRID_SIZE * 100}%;
  height: ${GRID_SIZE * 100}%;
  transition: transform 1.5s, top 1.5s, left 1.5s, bottom 1.5s, right 1.5s;
  //transform-origin: top left;
`;

export { TableProvider };
