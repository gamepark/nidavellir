/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

type HeroesAreaProps = {};

const HeroesArea: FC<HeroesAreaProps> = () => {
  const { t } = useTranslation();

  return (
    <div css={area}>
      <div css={title}>
        <span>{t('heroes.header', 'Heroes')}</span>
      </div>
    </div>
  );
};

const area = css`
  position: absolute;
  width: 184em;
  height: 135em;
  background-color: #e9e3d8cc;
  top: 126em;
  left: 397em;
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

export { HeroesArea };
