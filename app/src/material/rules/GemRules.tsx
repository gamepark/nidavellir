/** @jsxImportSource @emotion/react */
import { MaterialRulesProps } from "@gamepark/react-game";
import { useTranslation } from "react-i18next";
import { FC } from "react";
import { css } from "@emotion/react";
import { Gem } from "@gamepark/nidavellir/material/Gem";

export const GemRules: FC<MaterialRulesProps> = (props) => {
  const { t } = useTranslation()
  const { item } = props;
  const special = item.id === Gem.Gem6
  return (
    <>
      <h2 css={norse}>{t(`rule.gem`, { value: item.id })}</h2>
      <p>{t('rule.gem.description', { value: item.id })}</p>
      {special && <><hr /><p>{t('rule.gem.crown-jeweler')}</p></>}
    </>
  )
}

const norse = css`
  font-family: Norse, Arial, Serif
`