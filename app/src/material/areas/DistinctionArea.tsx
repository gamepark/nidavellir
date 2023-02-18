/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

type DistinctionAreaProps = {};

const DistinctionArea: FC<DistinctionAreaProps> = () => {
  const { t } = useTranslation();

  return (
    <div css={area}>
      <div css={title}>
        <span>{t('distinctions.header', 'Distinctions')}</span>
      </div>
    </div>
  );
};

const area = css`
  position: absolute;
  width: 130em;
  height: 51em;
  background-color: #e9e3d8cc;
  top: 135em;
  left: 10em;
  border-radius: 3em;
`;

const title = css`
  position: absolute;
  top: 1em;
  border-bottom: 0.2em solid rgba(0, 0, 0, 0.5);
  color: rgba(0, 0, 0, 0.5);
  margin-left: 6em;

  > span {
    font-weight: bold;
    font-family: 'Norse', 'Arial', serif;
    font-size: 9em;
  }
`;

export { DistinctionArea };
