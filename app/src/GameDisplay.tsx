/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react'
import GameView from '@gamepark/nidavellir/state/view/GameView'
import { PlayerBoard } from './material/player/PlayerBoard'
import { TableProvider } from './table/TableContext'
import { Taverns } from './material/tavern/Taverns'
import { CoinTokens } from './material/coin/CoinTokens'
import { AgeCards } from './material/card/AgeCards'
import { HeroCards } from './material/card/HeroCards'
import { GemTokens } from './material/gem/GemTokens'
import { DistinctionCards } from './material/card/DistinctionCards'
import { gameWidth, navigationWidth, playerPanelsWidth } from './material/Styles'
import { useEffect, useState } from 'react'
import { usePlacements, useViews, View, ViewType } from './material/View'
import { PlayerPanels } from './player/PlayerPanels'
import RulesDialog from './dialog/RulesDialog'
import { HeroesArea } from './material/areas/HeroesArea'
import { TreasureArea } from './material/areas/TreasureArea'
import { DistinctionArea } from './material/areas/DistinctionArea'
import { TavernArea } from './material/areas/TavernArea'
import { CardHandsArea } from './material/areas/CardHandsArea'
import { NavigationMenu } from './navigation/NavigationMenu'
import { useTutorial } from '@gamepark/react-client'
import { ScoreDialog } from './dialog/ScoreDialog'

type Props = {
  game: GameView;
};

export default function GameDisplay({ game }: Props) {
  const views = useViews()
  const [view, setView] = useState<View>(views.find((v) => v.type === ViewType.GLOBAL)!)
  const [scoreDisplayed, setDisplayScore] = useState(false)
  const placements = usePlacements(game.players)
  const tutorial = useTutorial()

  useEffect(() => {
    tutorial?.setOpponentsPlayAutomatically(true)
  }, [tutorial])

  const setPlayerView = (playerId: number) => {
    setView(views.find((v) => v.player === playerId)!)
  }

  return (
    <>
      <div css={ gameArea }>
        <TableProvider view={ view } placements={ placements } views={ views }>
          { game.players.map((p, index) => (
            <PlayerBoard key={ p.id } player={ p.id } index={ index } game={ game }/>
          )) }
          <HeroesArea/>
          <TreasureArea/>
          <DistinctionArea/>
          <CardHandsArea game={ game }/>
          <TavernArea playerCount={ game.players.length }/>
          <GemTokens game={ game }/>
          <Taverns playerCount={ game.players.length }/>
          <AgeCards game={ game }/>
          <HeroCards game={ game }/>
          <DistinctionCards game={ game }/>
          <CoinTokens game={ game }/>
        </TableProvider>
      </div>
      <NavigationMenu
        game={ game }
        changeView={ setView }
        view={ view }
        setDisplayScore={ setDisplayScore }
        scoreDisplayed={ scoreDisplayed }/>
      <PlayerPanels game={ game } view={ view } onPanelClick={ (p) => setPlayerView(p) }/>
      <RulesDialog game={ game }/>
      { scoreDisplayed && <ScoreDialog game={ game } close={ () => setDisplayScore(false) }/> }
    </>
  )
}
const gameAreaWidth = gameWidth - playerPanelsWidth - navigationWidth
const gameArea = css`
  position: absolute;
  height: 93em;
  width: ${ gameAreaWidth }em;
  left: calc((100% - ${ playerPanelsWidth }em) / 2 + (${ navigationWidth / 2 }em));
  transform: translate3d(-50%, -50%, 0);
  transform-style: preserve-3d;
  top: calc(7em + 46.5%);
  will-change: transform;
`
