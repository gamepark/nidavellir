/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import GameView from '@gamepark/nidavellir/state/view/GameView';
import { PlayerBoard } from './material/player/PlayerBoard';
import { TableProvider } from './table/TableContext';
import { Taverns } from './material/tavern/Taverns';
import { CoinTokens } from './material/coin/CoinTokens';
import { AgeCards } from './material/card/AgeCards';
import { HeroCards } from './material/card/HeroCards';
import { GemTokens } from './material/gem/GemTokens';
import { DistinctionCards } from './material/card/DistinctionCards';
import { gameWidth, navigationWidth, playerPanelsWidth } from './material/Styles';
import { passMove } from '@gamepark/nidavellir/moves/Pass';
import { useState } from 'react';
import { usePlacements, useViews, View, ViewType } from './material/View';
import { usePlay, usePlayerId } from '@gamepark/react-client';
import { PlayerPanels } from './player/PlayerPanels';
import RulesDialog from './dialog/RulesDialog';
import { useLegalMoves } from './hook/rules.hook';
import MoveType from '@gamepark/nidavellir/moves/MoveType';
import { HeroesArea } from './material/areas/HeroesArea';
import { TreasureArea } from './material/areas/TreasureArea';
import { DistinctionArea } from './material/areas/DistinctionArea';
import { TavernArea } from './material/areas/TavernArea';
import { CardHandsArea } from './material/areas/CardHandsArea';

type Props = {
  game: GameView;
};

export default function GameDisplay({ game }: Props) {
  const views = useViews(game.players);
  const [view, setView] = useState<View>(views.find((v) => v.type === ViewType.GLOBAL)!);
  const placements = usePlacements(game.players);
  // TODO: REMOVE IT FROM THIS COMPONENT
  const play = usePlay();
  const playerId = usePlayerId();
  const legalMoves = useLegalMoves(game, playerId, [MoveType.Pass]);
  const canPass = legalMoves.length === 1;

  const setPlayerView = (playerId: number) => {
    setView(views.find((v) => v.player === playerId)!);
  };

  return (
    <>
      <div css={gameArea}>
        <TableProvider view={view} placements={placements} views={views}>
          {game.players.map((p, index) => (
            <PlayerBoard key={p.id} player={p.id} index={index} game={game} />
          ))}
          <HeroesArea />
          <TreasureArea />
          <DistinctionArea />
          <CardHandsArea game={game} />
          <TavernArea playerCount={game.players.length} />
          <GemTokens game={game} />
          <Taverns playerCount={game.players.length} />
          <AgeCards game={game} />
          <HeroCards game={game} />
          <DistinctionCards game={game} />
          <CoinTokens game={game} />
        </TableProvider>
      </div>
      <div css={navigationArea}>
        {views
          .filter((v: View) => v.player === undefined)
          .map((v, index) => {
            return (
              <button
                key={index}
                css={css`
                  position: absolute;
                  top: ${index * 9 + 5}em;
                  left: 0;
                  width: ${view === v ? 14 : 7}em;
                  height: 7em;
                  border-radius: 0 5em 5em 0;
                  transition: 0.5s width;
                  cursor: pointer;
                `}
                onClick={() => setView(v)}
              >
                {v.label}
              </button>
            );
          })}
        {canPass && (
          <button
            key="pass"
            css={css`
              position: absolute;
              top: ${(views.length - game.players.length) * 9 + 5}em;
              left: 0;
              width: 7em;
              height: 7em;
              border-radius: 0 50% 50% 0;
            `}
            onClick={() => play(passMove(playerId))}
          >
            Pass
          </button>
        )}
      </div>
      <PlayerPanels game={game} view={view} onPanelClick={(p) => setPlayerView(p)} />
      <RulesDialog game={game} />
    </>
  );
}

const navigationArea = css`
  position: absolute;
  top: 7em;
  height: 93em;
  width: ${navigationWidth}em;
  left: 0;
`;
const gameAreaWidth = gameWidth - playerPanelsWidth - navigationWidth;
const gameArea = css`
  position: absolute;
  height: 93em;
  width: ${gameAreaWidth}em;
  left: calc((100% - ${playerPanelsWidth}em) / 2 + (${navigationWidth / 2}em));
  transform: translate3d(-50%, -50%, 0);
  transform-style: preserve-3d;
  top: calc(7em + 46.5%);
  will-change: transform;
`;
