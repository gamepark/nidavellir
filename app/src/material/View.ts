import { useCallback, useMemo } from 'react'
import { DragLayerMonitor } from 'react-dnd'
import { useCameraView, useDisplayedPlayers } from '../table/TableContext'
import { BASE_SCALE } from './Styles'
import { Player } from '@gamepark/nidavellir/state/Player'
import { useTranslation } from 'react-i18next'

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
  label: string;
  player?: any;
  scale: number;
} & Record<string, any>;

export const viewProjection = (monitor: DragLayerMonitor, view?: View) => {
  const offset = monitor.getDifferenceFromInitialOffset()
  if (!offset || !view) return null

  const x = offset.x / view.scale
  const y = offset.y / view.scale

  return { x, y }
}

export const useViews = (players: Player[]): View[] => {
  const displayedPlayers = useDisplayedPlayers(players)
  const { t } = useTranslation()
  return useMemo(
    () => [
      { type: ViewType.GLOBAL, label: t('menu.global', 'Global'), scale: BASE_SCALE },
      { type: ViewType.TAVERNS, label: t('menu.tavern', 'Tavern'), scale: 0.8 },
      { type: ViewType.HEROES, label: t('menu.heroes', 'Heroes'), scale: 0.8 },
      { type: ViewType.TREASURE, label: t('menu.treasure', 'Treasure'), scale: 0.8 },
      ...displayedPlayers.map((k) => ({
        type: ViewType.PLAYER,
        player: k,
        label: '',
        scale: 0.78
      }))
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [displayedPlayers]
  )
}


export const usePlacements = (players: Player[]) => {
  const displayed = useDisplayedPlayers(players)
  return useMemo(() => {
    switch (players.length) {
      case 2:
        return { [displayed[0]]: 0, [displayed[1]]: 3 }
      case 3:
        return { [displayed[0]]: 0, [displayed[1]]: 1, [displayed[2]]: 3 }
      case 4:
        return { [displayed[0]]: 0, [displayed[1]]: 1, [displayed[2]]: 3, [displayed[3]]: 4 }
      default:
        return { [displayed[0]]: 0, [displayed[1]]: 1, [displayed[2]]: 2, [displayed[3]]: 3, [displayed[4]]: 4 }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

export const useProjection = () => {
  const view = useCameraView()
  return useCallback((monitor: DragLayerMonitor) => viewProjection(monitor, view), [view])
}
