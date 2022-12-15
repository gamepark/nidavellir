/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC } from 'react';
import Images from '../../images/Images';
import { tavernHeight, tavernLeft, tavernTop, tavernWidth } from '../Styles';

type TavernProps = {
  tavern: number;
};

const Tavern: FC<TavernProps> = (props) => {
  const { tavern } = props;
  return <div css={tavernStyle(tavern)} />;
};

const tavernStyle = (tavern: number) => css`
  position: absolute;
  height: ${tavernHeight}em;
  width: ${tavernWidth}em;
  top: ${tavernTop(tavern)}em;
  left: ${tavernLeft}em;
  background-image: url(${TavernImages.get(tavern)});
  background-size: cover;
`;

const TavernImages = new Map<number, any>();
TavernImages.set(0, Images.LaughingGoblin);
TavernImages.set(1, Images.DancingDragon);
TavernImages.set(2, Images.ShiningHorse);

export { Tavern };
