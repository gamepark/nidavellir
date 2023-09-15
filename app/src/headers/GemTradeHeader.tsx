import { useTranslation } from 'react-i18next'

export const GemTradeHeader = () => {
  const { t } = useTranslation()

  return <>{t('header.gem-trade')}</>
}