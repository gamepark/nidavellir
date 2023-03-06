/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC } from 'react';
import { CardHandArea } from './CardHandArea';
import { getCardPositionInHandX, getCardPositionInHandY, playerBoardPositions } from '../Styles';
import { useCardDecksSize } from '../../hook/card.hook';
import entries from 'lodash/entries';
import { LocationType } from '@gamepark/nidavellir/state/Location';
import GameView from '@gamepark/nidavellir/state/view/GameView';
import { usePlayerPositions } from '../../table/TableContext';

type CardHandsAreaProps = {
  game: GameView;
};

const CardHandsArea: FC<CardHandsAreaProps> = (props) => {
  const { game } = props;
  const playerPositions = usePlayerPositions();
  const cardDeckSize = useCardDecksSize(game.cards);
  const playerWithHand = entries(cardDeckSize[LocationType.PlayerHand] as object);

  return (
    <>
      {playerWithHand.map((e) => (
        <CardHandArea key={`hand-${e[0]}`} handSize={e[1]} css={playerHand(e[0], e[1] as number, playerPositions)} />
      ))}
    </>
  );
};
const playerHand = (playerId: string, deckSize: number, playerPositions: any) => {
  const position = playerBoardPositions[playerPositions[playerId]];
  return css`
    transform: translate3d(
      ${getCardPositionInHandX(position, deckSize, 0) - 2}em,
      ${getCardPositionInHandY(position) - 10}em,
      90em
    );
  `;
};

export { CardHandsArea };
