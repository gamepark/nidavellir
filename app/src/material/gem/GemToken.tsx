/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC, HTMLAttributes } from 'react';
import Images from '../../images/Images';
import { gemTokenHeight, gemTokenWidth } from '../Styles';
import { Animation, useAnimation, usePlay } from '@gamepark/react-client';
import MoveType from '@gamepark/nidavellir/moves/MoveType';
import { Gem1, Gem2, Gem3, Gem4, Gem5, Gem6, Gems } from '@gamepark/nidavellir/gems/Gems';
import { Gem } from '@gamepark/nidavellir/gems/Gem';
import { LocatedGem } from '@gamepark/nidavellir/state/LocatedGem';
import { gemRulesDialog, setRulesDialog } from '@gamepark/nidavellir/moves/RulesDialog/RulesDialog';

type GemTokenProps = {
  gem: LocatedGem;
  scale?: number;
  getPosition?: (card: LocatedGem, animation?: Animation) => any;
} & HTMLAttributes<HTMLDivElement>;

const GemToken: FC<GemTokenProps> = (props) => {
  const play = usePlay();
  const { gem, getPosition, scale, ...rest } = props;
  const detail = gem.id !== undefined ? Gems[gem.id] : undefined;
  const animation = useAnimation(({ move }) => move.type === MoveType.MoveGem && move.id === gem.id);

  const onTokenClick = () => {
    play(setRulesDialog(gemRulesDialog(gem)), { local: true });
  };

  return (
    <div
      onClick={onTokenClick}
      css={[gemToken(scale), animation && transitionFor(animation), getPosition?.(gem, animation)]}
      {...rest}
    >
      {!!detail && <div css={gemFace(detail)} />}
    </div>
  );
};

const transitionFor = (animation: Animation) => css`
  transition: transform ${animation.duration}s;
`;

const gemToken = (scale: number = 1) => css`
  position: absolute;
  height: ${gemTokenHeight * scale}em;
  width: ${gemTokenWidth * scale}em;
  border-radius: 50%;
  transform-style: preserve-3d;
  cursor: pointer;
  will-change: transform;
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
  image-rendering: -webkit-optimize-contrast;
  backface-visibility: hidden;
  filter: drop-shadow(0.3em 0.3em 0.6em black);
`;

const GemTokensImages = new Map<Gem, any>();
GemTokensImages.set(Gem1, Images.Gem1);
GemTokensImages.set(Gem2, Images.Gem2);
GemTokensImages.set(Gem3, Images.Gem3);
GemTokensImages.set(Gem4, Images.Gem4);
GemTokensImages.set(Gem5, Images.Gem5);
GemTokensImages.set(Gem6, Images.Gem6);

export { GemToken };
