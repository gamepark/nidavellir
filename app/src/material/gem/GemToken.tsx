/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { SecretCoin } from '@gamepark/nidavellir/state/view/SecretCoin';
import { FC } from 'react';
import Images from '../../images/Images';
import {
  gemTokenHeight,
  gemTokenWidth,
  getGemTokenOnPlayerBoardRotate,
  getGemTokenOnPlayerBoardX,
  getGemTokenOnPlayerBoardY,
  playerBoardPositions,
} from '../Styles';
import { isOnPlayerBoard } from '@gamepark/nidavellir/utils/location.utils';
import { usePlayerPositions } from '../../table/TableContext';
import { Animation, useAnimation } from '@gamepark/react-client';
import MoveType from '@gamepark/nidavellir/moves/MoveType';
import { MoveCoin } from '@gamepark/nidavellir/moves/MoveCoin';
import { Gem1, Gem2, Gem3, Gem4, Gem5, Gem6, Gems } from '@gamepark/nidavellir/gems/Gems';
import { Gem } from '@gamepark/nidavellir/gems/Gem';

type GemTokenProps = {
  gem: SecretCoin;
  moves?: MoveCoin[];
};

const GemToken: FC<GemTokenProps> = (props) => {
  const { gem } = props;
  const detail = gem.id !== undefined ? Gems[gem.id] : undefined;
  const playerPositions = usePlayerPositions();
  const animation = useAnimation(({ move }) => move.type === MoveType.MoveGem && move.id === gem.id);

  return (
    <div css={[gemToken, gemPosition(gem, playerPositions), animation && transitionFor(animation)]}>
      {!!detail && <div css={gemFace(detail)} />}
      <div css={gemBack} />
    </div>
  );
};

const transitionFor = (animation: Animation) => css`
  z-index: 100;
  transition: transform ${animation.duration}s;
`;

const gemPosition = (gem: SecretCoin, playerPositions: any) => {
  if (isOnPlayerBoard(gem.location)) {
    const position = playerBoardPositions[playerPositions[gem.location.player]];
    return css`
      transform: translate(${getGemTokenOnPlayerBoardX(position)}em, ${getGemTokenOnPlayerBoardY(position)}em)
        rotateZ(${getGemTokenOnPlayerBoardRotate(position)}deg);
    `;
  }

  return css`
    display: none;
  `;
};

const gemToken = css`
  position: absolute;
  height: ${gemTokenHeight}em;
  width: ${gemTokenWidth}em;
  border-radius: 50%;
  transform-style: preserve-3d;
`;

const gemFace = (gem: Gem) => css`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  border-radius: 50%;
  background-image: url(${GemTokensImages.get(gem)!});
  background-size: cover;
  backface-visibility: hidden;
  box-shadow: 0.5em 0.5em 0.7em -0.2em black;
`;

const gemBack = css`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  border-radius: 50%;
  background-color: goldenrod;
  transform: rotateY(180deg);
  backface-visibility: hidden;
  box-shadow: 0.5em 0.5em 0.7em -0.2em black;
`;

const GemTokensImages = new Map<Gem, any>();
GemTokensImages.set(Gem1, Images.Gem1);
GemTokensImages.set(Gem2, Images.Gem2);
GemTokensImages.set(Gem3, Images.Gem3);
GemTokensImages.set(Gem4, Images.Gem4);
GemTokensImages.set(Gem5, Images.Gem5);
GemTokensImages.set(Gem6, Images.Gem6);

export { GemToken };
