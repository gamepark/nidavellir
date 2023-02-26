/** @jsxImportSource @emotion/react */
import { FC, useCallback } from 'react';
import GameView from '@gamepark/nidavellir/state/view/GameView';
import { usePlayerId } from '@gamepark/react-client';
import MoveType from '@gamepark/nidavellir/moves/MoveType';
import { useLegalMoves } from '../../hook/rules.hook';
import { SecretCard } from '@gamepark/nidavellir/state/view/SecretCard';
import { MoveHero } from '@gamepark/nidavellir/moves/MoveHero';
import { HeroCard } from './HeroCard';
import { isInArmy, isInCommandZone, isInHeroDeck } from '@gamepark/nidavellir/utils/location.utils';
import {
  cardWidth,
  getCardPositionInCommandZoneX,
  getCardPositionInCommandZoneY,
  getCardPositionInHeroDeckLeft,
  getCardPositionInHeroDeckTop,
  getCardPositionOnPlayerBoardX,
  getCardPositionOnPlayerBoardY,
  playerBoardPositions,
} from '../Styles';
import { usePlayerPositions } from '../../table/TableContext';

type AgeCardsProps = {
  game: GameView;
};

const HeroCards: FC<AgeCardsProps> = (props) => {
  const { game } = props;
  const playerId = usePlayerId();
  const playerPositions = usePlayerPositions();
  const moves = useLegalMoves<MoveHero>(game, playerId, [MoveType.MoveHero]);
  const getCardMoves = useCallback((c: SecretCard) => moves.filter((m) => m.id === c.id), [moves]);

  return (
    <>
      {game.heroes.map((c, index) => (
        <HeroCard
          card={c}
          key={index}
          moves={getCardMoves(c)}
          transform={(card) => cardPosition(card, playerPositions)}
        />
      ))}
    </>
  );
};

const cardPosition = (card: SecretCard, playerPositions: any) => {
  if (isInHeroDeck(card.location)) {
    return `translate3d(${getCardPositionInHeroDeckLeft(card.location.index)}em, ${getCardPositionInHeroDeckTop(
      card.location.index
    )}em, ${(card.location.index + 1) * cardWidth}em)
    `;
  }

  if (isInArmy(card.location)) {
    const position = playerBoardPositions[playerPositions[card.location.player]];
    return `translate3d(${getCardPositionOnPlayerBoardX(
      position,
      card.location.column
    )}em, ${getCardPositionOnPlayerBoardY(position, card.location.index!)}em, ${
      ((card.location.index ?? 0) + 1) * cardWidth
    }em)`;
  }

  if (isInCommandZone(card.location)) {
    const position = playerBoardPositions[playerPositions[card.location.player]];
    return `translate3d(${getCardPositionInCommandZoneX(position)}em, ${getCardPositionInCommandZoneY(
      position,
      card.location.index!
    )}em, ${(card.location.index + 1) * cardWidth}em)`;
  }

  return '';
};

export { HeroCards };
