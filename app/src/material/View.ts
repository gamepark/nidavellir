import { useCallback } from 'react';
import { DragLayerMonitor } from 'react-dnd';
import { useCameraView } from '../table/TableContext';

export enum ViewType {
  PLAYER = 1,
  TREASURE,
  TAVERNS,
  HEROES,
  DISTINCTIONS,
  GLOBAL,
}

export type View = {
  type: ViewType;
  scale: number;
} & Record<string, any>;

export const viewProjection = (monitor: DragLayerMonitor, view: View) => {
  const offset = monitor.getDifferenceFromInitialOffset();
  if (!offset) return null;

  const x = offset.x / view.scale;
  const y = offset.y / view.scale;

  return { x, y };
};

export const useProjection = () => {
  const view = useCameraView();
  return useCallback((monitor: DragLayerMonitor) => viewProjection(monitor, view), [view]);
};
