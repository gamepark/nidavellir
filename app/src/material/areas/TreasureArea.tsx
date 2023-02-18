/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

type TreasureAreaProps = {};

const TreasureArea: FC<TreasureAreaProps> = () => {
  const { t } = useTranslation();

  return (
    <div css={area}>
      <div css={title}>
        <span>{t('treasure.header', 'Royal Treasure')}</span>
      </div>
    </div>
  );
};

const area = css`
  position: absolute;
  width: 130em;
  height: 66em;
  background-color: #e9e3d8cc;
  top: 193em;
  left: 10em;
  border-radius: 3em;
`;

const title = css`
  position: absolute;
  bottom: 1em;
  border-top: 0.2em solid rgba(0, 0, 0, 0.5);
  color: rgba(0, 0, 0, 0.5);
  margin-left: 6em;

  > span {
    font-weight: bold;
    font-family: 'Norse', 'Arial', serif;
    font-size: 9em;
  }
`;

export { TreasureArea };
