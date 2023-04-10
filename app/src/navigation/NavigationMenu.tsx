/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import { FC } from 'react'
import { useViews, View, ViewType } from '../material/View'
import GameView from '@gamepark/nidavellir/state/view/GameView'
import { passMove } from '@gamepark/nidavellir/moves/Pass'
import { navigationWidth } from '../material/Styles'
import { usePlay, usePlayerId } from '@gamepark/react-client'
import { useLegalMoves } from '../hook/rules.hook'
import MoveType from '@gamepark/nidavellir/moves/MoveType'
import { NavigationMenuEntry } from './menu-entry/NavigationMenuEntry'
import Images from '../images/Images'
import { useTranslation } from 'react-i18next'

type NavigationMenuProps = {
  game: GameView;

  view?: View;
  changeView: (view: View) => void;
  setDisplayScore: (value: boolean) => void;
  scoreDisplayed?: boolean;
};

const NavigationIcons = {
  [ViewType.TAVERNS]: Images.TavernIcon,
  [ViewType.HEROES]: Images.HeroesIcon,
  [ViewType.TREASURE]: Images.TreasureIcon
}

const NavigationMenu: FC<NavigationMenuProps> = (props) => {
  const { game, view, changeView, scoreDisplayed, setDisplayScore } = props

  const views = useViews()
  const { t } = useTranslation()
  const playerId = usePlayerId()
  const play = usePlay()
  const legalMoves = useLegalMoves(game, playerId, [MoveType.Pass])
  const canPass = legalMoves.length === 1

  const pass = () => {
    if (canPass) {
      play(passMove(playerId))
    }
  }

  return (
    <div css={ navigationArea }>
      { views
        .filter((v: View) => v.player === undefined)
        .map((v, index) =>
          (
            <NavigationMenuEntry
              key={ v.type }
              label={ v.label }
              icon={ NavigationIcons[v.type] ?? undefined }
              css={ menuPosition(index) }
              onClick={ () => changeView(v) }
              selected={ v.type === view?.type }
            />
          )) }
      <NavigationMenuEntry
        label={ t('menu.score') }
        css={ [menuPosition(4)] }
        selected={ scoreDisplayed }
        onClick={ () => setDisplayScore(true) }
      />
      <NavigationMenuEntry
        label={ t('menu.pass') }
        css={ [menuPosition(5), passButton, !canPass && hidden(5)] }
        onClick={ pass }
      />
    </div>
  )
}
const menuPosition = (index: number) => css`
  transform: translate3d(0, ${ index * 10 + 5 }em, 0);
`

const passButton = css`
  transition: transform 0.2s, padding-left 0.2s;
`

const hidden = (index: number) => css`
  transform: translate3d(0, ${ index * 10 + 5 }em, 0) translateX(-100%);
  cursor: default;
`

const navigationArea = css`
  position: absolute;
  height: 93em;
  width: ${ navigationWidth }em;
  transform: translate3d(0, 7em, 0);
`

export { NavigationMenu }
