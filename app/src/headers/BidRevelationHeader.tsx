import { useTranslation } from 'react-i18next'
import { useRules } from '@gamepark/react-game'
import { NidavellirRules } from '@gamepark/nidavellir/NidavellirRules'
import { Memory } from '@gamepark/nidavellir/rules/Memory'

export const BidRevelationHeader = () => {
  const rules = useRules<NidavellirRules>()!
  const tavern = rules.remind(Memory.Tavern)
  const { t } = useTranslation()

  return <>{t('header.bid-revelation', { tavern: t(`tavern.${tavern}`) })}</>
}