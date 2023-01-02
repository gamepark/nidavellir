/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { PlayerId } from '@gamepark/nidavellir/state/Player';
import GameView from '@gamepark/nidavellir/state/view/GameView';
import { FC } from 'react';
import { playerBoardHeight, playerBoardPositions, playerBoardWidth } from '../Styles';
import Images from '../../images/Images';
import { usePlayerPositions } from '../../table/TableContext';
import { DwarfType } from '@gamepark/nidavellir/cards/Card';
import { usePlayerId } from '@gamepark/react-client';
import { PlayerBoardColumn } from './PlayerBoardColumn';
import { CommandZone } from './CommandZone';
import { BidPlaces } from './BidPlaces';
import { useLegalMoves } from '../../hook/legal-move.hook';
import MoveType from '@gamepark/nidavellir/moves/MoveType';
import { HeroType } from '@gamepark/nidavellir/cards/Hero';
import { MoveCard } from '@gamepark/nidavellir/moves/MoveCard';
import { isOnPlayerBoardCard } from '@gamepark/nidavellir/utils/location.utils';
import { MoveHero } from '@gamepark/nidavellir/moves/MoveHero';

type PlayerBoardProps = {
  player: PlayerId;
  index: number;
  game: GameView;
};

const PlayerBoard: FC<PlayerBoardProps> = (props) => {
  const { game, player } = props;
  const playerId = usePlayerId();
  const positions = usePlayerPositions();
  const moves = useLegalMoves<MoveCard | MoveHero>(game, playerId, [MoveType.MoveCard, MoveType.MoveHero]);
  const getColumnMoves = (column: DwarfType | HeroType) =>
    moves.filter(
      (m: MoveCard | MoveHero) =>
        isOnPlayerBoardCard(m.target) && m.target.column === column && m.target.player === player
    );

  return (
    <>
      <CommandZone position={positions[player]} moves={getColumnMoves(HeroType.Neutral)} />
      <div css={playerBoard(positions[player])}>{playerId === player && <BidPlaces game={game} />}</div>
      <PlayerBoardColumn
        type={DwarfType.Blacksmith}
        color="#4c2c9f"
        background="#a78aa380"
        position={positions[player]}
        moves={getColumnMoves(DwarfType.Blacksmith)}
      />
      <PlayerBoardColumn
        type={DwarfType.Hunter}
        color="#277d53"
        background="#99a48780"
        position={positions[player]}
        moves={getColumnMoves(DwarfType.Hunter)}
      />
      <PlayerBoardColumn
        type={DwarfType.Explorer}
        color="#54a9e1"
        background="#92c2d480"
        position={positions[player]}
        moves={getColumnMoves(DwarfType.Explorer)}
      />
      <PlayerBoardColumn
        type={DwarfType.Miner}
        color="#f0782d"
        background="#cfb08e80"
        position={positions[player]}
        moves={getColumnMoves(DwarfType.Miner)}
      />
      <PlayerBoardColumn
        type={DwarfType.Warrior}
        color="#8f3526"
        background="#ae776980"
        position={positions[player]}
        moves={getColumnMoves(DwarfType.Warrior)}
      />
    </>
  );
};
const playerBoard = (index: number) => css`
  position: absolute;
  height: ${playerBoardHeight}em;
  width: ${playerBoardWidth}em;
  background-image: url(${Images.PlayerBoard});
  background-size: cover;
  filter: drop-shadow(0.3em 0.3em 0.6em black);
  ${playerBoardPositions[index].left && `left: ${playerBoardPositions[index].left}em;`}
  ${playerBoardPositions[index].top && `top: ${playerBoardPositions[index].top}em;`}
  transform: rotateZ(${playerBoardPositions[index].rotateZ}deg) translateZ(0);
`;

export { PlayerBoard };