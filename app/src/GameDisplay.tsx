/** @jsxImportSource @emotion/react */
import { css, keyframes } from '@emotion/react';
import GameView from '@gamepark/nidavellir/state/view/GameView';
import { Letterbox } from '@gamepark/react-components';
import { PlayerBoard } from './material/player/PlayerBoard';
import { TableProvider, useDisplayedPlayers } from './table/TableContext';
import { Taverns } from './material/tavern/Taverns';
import { CoinTokens } from './material/coin/CoinTokens';
import { AgeCards } from './material/card/AgeCards';
import { HeroCards } from './material/card/HeroCards';
import { GemTokens } from './material/gem/GemTokens';

type Props = {
  game: GameView;
};

export default function GameDisplay({ game }: Props) {
  const displayedPlayers = useDisplayedPlayers(game.players);

  return (
    <Letterbox css={letterBoxStyle} top={0}>
      <TableProvider players={displayedPlayers}>
        {game.players.map((p, index) => (
          <PlayerBoard key={p.id} player={p.id} index={index} game={game} />
        ))}
        <GemTokens game={game} />
        <Taverns />
        <AgeCards game={game} />
        <HeroCards game={game} />
        <CoinTokens game={game} />
      </TableProvider>
    </Letterbox>
  );
}

const fadeIn = keyframes`
  from, 50% {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const letterBoxStyle = css`
  > div {
    top: 7em;
  }

  animation: ${fadeIn} 3s ease-in forwards;
`;
