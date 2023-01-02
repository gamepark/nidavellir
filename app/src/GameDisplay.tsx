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
import { usePlacements, VIEWS, ViewType } from './material/View';
import { usePlay, usePlayerId } from '@gamepark/react-client';

type Props = {
  game: GameView;
};

export default function GameDisplay({ game }: Props) {
  const [view, setView] = useState<ViewType>(ViewType.GLOBAL);
  const placements = usePlacements(game.players);

  // TODO: REMOVE IT FROM THIS COMPONENT
  const play = usePlay();
  const playerId = usePlayerId();
  const views = [
    { type: ViewType.GLOBAL, label: 'Global' },
    { type: ViewType.TAVERNS, label: 'Taverns' },
    { type: ViewType.HEROES, label: 'Heroes' },
    { type: ViewType.TREASURE, label: 'Treasure' },
  ];

  return (
    <>
      <div css={gameArea}>
        <TableProvider view={view} placements={placements} views={VIEWS}>
          {game.players.map((p, index) => (
            <PlayerBoard key={p.id} player={p.id} index={index} game={game} />
          ))}
          <GemTokens game={game} />
          <Taverns />
          <AgeCards game={game} />
          <HeroCards game={game} />
          <DistinctionCards game={game} />
          <CoinTokens game={game} />
        </TableProvider>
      </div>
      <div css={navigationArea}>
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
              onClick={() => setView(v.type)}
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
      </div>
      <div css={playersArea} />
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
  left: ${gameAreaWidth / 2 + navigationWidth}em;
  transform: translate(-50%, -50%);
  top: calc(7em + 46.5%);
`;

const playersArea = css`
  position: absolute;
  right: 0;
  height: 93em;
  width: ${playerPanelsWidth}em;
  background-color: goldenrod;
  transform: translateY(-50%);
  top: calc(7em + 46.5%);
`;
