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
      <p><Trans i18nKey="rule.gem.description" defaults="In the event of a tie in the value of the coins played for a tavern, the order of the game is defined by the value of the gem possessed by the tied elvalands.\nYou become the active elvaland if you have the highest value gem.\n\nThe resolution continues in descending order of gem value until each tied elvaland has played.\n\nAt the end of a tavern resolution, a trade of gems is made between the tied elvalands for a given coin value. Once the trades are made, gems are put back into their respective cavities.\n\n<0>Tie between 2 Elvalands</0>: Gems are traded between them.\n<0>Tie between 3 Elvalands</0>: Only the lowest value gem and the highest value gem are trades.\n<0>Tie between 4 Elvalands</0>: The smaller value gem and the higher value gem are traded. The other two gems are traded between them.\n<0>Tie between 5 Elvalands</0>: The trade happens as for 4 Elvalands. The medium value gems are not traded." values={{ value: item.id }}><strong /></Trans></p>
      {special && <><hr /><p>{t('rule.gem.crown-jeweler')}</p></>}
    </>
  )
}

const norse = css`
  font-family: Norse, Arial, Serif
`
