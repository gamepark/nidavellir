import { useCallback, useMemo } from 'react';
import { DragLayerMonitor } from 'react-dnd';
import { useCameraView, useDisplayedPlayers } from '../table/TableContext';
import { BASE_SCALE } from './Styles';
import { Player } from '@gamepark/nidavellir/state/Player';

export enum ViewType {
  PLAYER = 1,
  TREASURE,
  TAVERNS,
  HEROES,
  DISTINCTIONS,
  GLOBAL,
}

export type View = {
  scale: number;
} & Record<string, any>;

export type Views = {
  [key: number]: View;
};

export const viewProjection = (monitor: DragLayerMonitor, view: View) => {
  const offset = monitor.getDifferenceFromInitialOffset();
  if (!offset) return null;

  const x = offset.x / view.scale;
  const y = offset.y / view.scale;

  return { x, y };
};

export const VIEWS: Views = {
  [ViewType.GLOBAL]: { scale: BASE_SCALE },
  [ViewType.TAVERNS]: { scale: 0.8 },
  [ViewType.HEROES]: { scale: 0.8 },
  [ViewType.TREASURE]: { scale: 0.8 },
};

export const usePlacements = (players: Player[]) => {
  const displayed = useDisplayedPlayers(players);
  return useMemo(() => {
    switch (players.length) {
      case 2:
        return { [displayed[0]]: 0, [displayed[1]]: 3 };
      case 3:
        return { [displayed[0]]: 0, [displayed[1]]: 1, [displayed[2]]: 3 };
      case 4:
        return { [displayed[0]]: 0, [displayed[1]]: 1, [displayed[2]]: 3, [displayed[3]]: 4 };
      default:
        return { [displayed[0]]: 0, [displayed[1]]: 1, [displayed[2]]: 2, [displayed[3]]: 3, [displayed[4]]: 4 };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export const useProjection = () => {
  const view = useCameraView();
  return useCallback((monitor: DragLayerMonitor) => viewProjection(monitor, view), [view]);
};
