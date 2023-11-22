/** @jsxImportSource @emotion/react */
import { MaterialHelpProps } from "@gamepark/react-game";
import { Trans, useTranslation } from 'react-i18next'
import { FC } from "react";
import { css } from "@emotion/react";
import { Gem } from "@gamepark/nidavellir/material/Gem";

export const GemHelp: FC<MaterialHelpProps> = (props) => {
  const { t } = useTranslation()
  const { item } = props;
  const special = item.id === Gem.Gem6
  return (
    <>
      <h2 css={norse}>{t(`rule.gem`, { value: item.id })}</h2>
      <p><Trans defaults="rule.gem.description" values={{ value: item.id }}><strong /></Trans></p>
      {special && <><hr /><p>{t('rule.gem.crown-jeweler')}</p></>}
    </>
  )
}

const norse = css`
  font-family: Norse, Arial, Serif
`
