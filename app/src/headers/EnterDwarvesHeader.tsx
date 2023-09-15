import { useTranslation } from 'react-i18next'

export const EnterDwarvesHeader = () => {
  const { t } = useTranslation()
  return <>{t('header.enter-dwarf')}</>
}
