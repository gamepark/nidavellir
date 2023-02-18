/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { cardWidth } from '../Styles';

type TavernAreaProps = {
  playerCount: number;
};

const TavernArea: FC<TavernAreaProps> = (props) => {
  const { t } = useTranslation();
  const { playerCount } = props;

  return (
    <div css={area(playerCount)}>
      <div css={title}>
        <span>{t('tavern.header', 'Taverns')}</span>
      </div>
    </div>
  );
};

const additionalAreaWidth = (playerCount: number) => {
  switch (playerCount) {
    case 4:
    case 5:
      return (cardWidth + 3) * (playerCount - 3);
    default:
      return 0;
  }
};

const area = (playerCount: number) => css`
  position: absolute;
  width: ${122 + additionalAreaWidth(playerCount)}em;
  height: 135em;
  background-color: #e9e3d8cc;
  top: 126em;
  left: ${205 + (playerCount !== undefined && playerCount < 4 ? 35 : 0)}em;
  border-radius: 3em;
`;

const title = css`
  position: absolute;
  border-bottom: 0.2em solid rgba(0, 0, 0, 0.5);
  color: rgba(0, 0, 0, 0.5);
  margin-left: 6em;
  top: 2em;

  > span {
    font-weight: bold;
    font-family: 'Norse', 'Arial', serif;
    font-size: 9em;
  }
`;

export { TavernArea };
