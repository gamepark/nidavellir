/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC } from 'react';
import GameView from '@gamepark/nidavellir/state/view/GameView';
import { GemToken } from './GemToken';
import { isInDistinctionDeck, isOnPlayerBoard } from '@gamepark/nidavellir/utils/location.utils';
import { getGemTokenOnPlayerBoardX, getGemTokenOnPlayerBoardY, playerBoardPositions } from '../Styles';
import { LocatedGem } from '@gamepark/nidavellir/state/LocatedGem';
import { usePlayerPositions } from '../../table/TableContext';
import { Animation } from '@gamepark/react-client';

type GemTokensProps = {
  game: GameView;
};

const GemTokens: FC<GemTokensProps> = (props) => {
  const { game } = props;
  const playerPositions = usePlayerPositions();
  return (
    <>
      {game.gems.map((gem, index) => (
        <GemToken gem={gem} key={index} getPosition={(gem, a) => gemPosition(gem, playerPositions, a)} />
      ))}
    </>
  );
};

const gemPosition = (gem: LocatedGem, playerPositions: any, animation?: Animation) => {
  if (isOnPlayerBoard(gem.location)) {
    const position = playerBoardPositions[playerPositions[gem.location.player]];
    return css`
      transform: translate3d(
        ${getGemTokenOnPlayerBoardX(position)}em,
        ${getGemTokenOnPlayerBoardY(position)}em,
        ${animation ? 1000 : 0}em
      );
    `;
  }

  if (isInDistinctionDeck(gem.location)) {
    return css`
      transform: translate3d(90.5em, 153em, 0em) rotateZ(180deg);
    `;
  }

  return css`
    display: none;
  `;
};

export { GemTokens };
