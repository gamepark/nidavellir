/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { SecretCoin } from '@gamepark/nidavellir/state/view/SecretCoin';
import { FC, HTMLAttributes } from 'react';
import Images from '../../images/Images';
import { gemTokenHeight, gemTokenWidth } from '../Styles';
import { Animation, useAnimation } from '@gamepark/react-client';
import MoveType from '@gamepark/nidavellir/moves/MoveType';
import { Gem1, Gem2, Gem3, Gem4, Gem5, Gem6, Gems } from '@gamepark/nidavellir/gems/Gems';
import { Gem } from '@gamepark/nidavellir/gems/Gem';

type GemTokenProps = {
  gem: SecretCoin;
} & HTMLAttributes<HTMLDivElement>;

const GemToken: FC<GemTokenProps> = (props) => {
  const { gem, ...rest } = props;
  const detail = gem.id !== undefined ? Gems[gem.id] : undefined;
  const animation = useAnimation(({ move }) => move.type === MoveType.MoveGem && move.id === gem.id);

  return (
    <div css={[gemToken, animation && transitionFor(animation)]} {...rest}>
      {!!detail && <div css={gemFace(detail)} />}
      <div css={gemBack} />
    </div>
  );
};

const transitionFor = (animation: Animation) => css`
  z-index: 100;
  transition: transform ${animation.duration}s;
`;

const gemToken = css`
  position: absolute;
  height: ${gemTokenHeight}em;
  width: ${gemTokenWidth}em;
  border-radius: 50%;
  transform-style: preserve-3d;
  cursor: pointer;

  &:hover {
    z-index: 10000;
  }
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
  filter: drop-shadow(0.3em 0.3em 0.6em black);
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
