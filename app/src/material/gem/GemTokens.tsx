/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC } from 'react';
import GameView from '@gamepark/nidavellir/state/view/GameView';
import { GemToken } from './GemToken';
import { isInDistinctionDeck, isOnPlayerBoard } from '@gamepark/nidavellir/utils/location.utils';
import { getGemTokenOnPlayerBoardX, getGemTokenOnPlayerBoardY, playerBoardPositions } from '../Styles';
import { LocatedGem } from '@gamepark/nidavellir/state/LocatedGem';
import { usePlayerPositions } from '../../table/TableContext';

type GemTokensProps = {
  game: GameView;
};

const GemTokens: FC<GemTokensProps> = (props) => {
  const { game } = props;
  const playerPositions = usePlayerPositions();
  return (
    <>
      {game.gems.map((gem, index) => (
        <GemToken gem={gem} key={index} css={gemPosition(gem, playerPositions)} />
      ))}
    </>
  );
};

const gemPosition = (gem: LocatedGem, playerPositions: any) => {
  if (isOnPlayerBoard(gem.location)) {
    const position = playerBoardPositions[playerPositions[gem.location.player]];
    return css`
      transform: translate(${getGemTokenOnPlayerBoardX(position)}em, ${getGemTokenOnPlayerBoardY(position)}em)
        rotateZ(180deg);
    `;
  }

  if (isInDistinctionDeck(gem.location)) {
    return css`
      transform: translate(66em, 153em) rotateZ(180deg);
    `;
  }

  return css`
    display: none;
  `;
};

export { GemTokens };
