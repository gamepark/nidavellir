/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC, HTMLAttributes } from 'react';
import Images from '../../images/Images';
import { tavernHeight, tavernLeft, tavernTop, tavernWidth } from '../Styles';

type TavernProps = {
  tavern: number;
  playerCount?: number;
} & HTMLAttributes<HTMLDivElement>;

const Tavern: FC<TavernProps> = (props) => {
  const { tavern, playerCount, ...rest } = props;
  return <div css={tavernStyle(tavern, playerCount)} {...rest} />;
};

const tavernStyle = (tavern: number, playerCount?: number) => css`
  position: absolute;
  height: ${tavernHeight}em;
  width: ${tavernWidth}em;
  top: ${tavernTop(tavern)}em;
  left: ${tavernLeft(playerCount)}em;
  background-image: url(${TavernImages.get(tavern)});
  background-size: cover;
`;

const TavernImages = new Map<number, any>();
TavernImages.set(0, Images.LaughingGoblin);
TavernImages.set(1, Images.DancingDragon);
TavernImages.set(2, Images.ShiningHorse);

export { Tavern };
