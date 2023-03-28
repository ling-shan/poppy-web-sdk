import { DefaultFooter } from '@ant-design/pro-components'
import React from 'react'

export function Footer() {
  // const { appInfo } = useGlobalContext()
  // const { t } = useTranslation()

  const currentYear = new Date().getFullYear()

  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      // copyright={`${currentYear} ${t(appInfo.name)} ${
      //   appInfo.icpRecordInfo || ''
      // }`}
    />
  )
}

export default Footer;
