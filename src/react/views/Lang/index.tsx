import { TranslationOutlined } from '@ant-design/icons'
import { Button, ButtonProps, Dropdown, MenuProps } from 'antd'
import React from 'react'

export type LangProps = ButtonProps

export function Lang(props: LangProps) {
  // const { langList } = useGlobalContext()
  // const { i18n } = useTranslation()

  // const items: MenuProps['items'] = langList.map((item) => ({
  //   key: item.locale,
  //   label: (
  //     <span style={{ minWidth: '80px', display: 'block' }}>{item.name}</span>
  //   ),
  // }))

  const handlerSwitch: MenuProps['onClick'] = async (e) => {
    if (e) {
      // i18n.changeLanguage(e.key)
      // window.location.reload()
    }
  }

  // 只支持一个语言则
  // if ((langList?.length ?? 0) < 2) {
  //   return null
  // }

  return (
    <Dropdown
      placement="topRight"
      arrow
      // menu={{ items, onClick: handlerSwitch, selectedKeys: [i18n.language] }}
    >
      <Button {...props} type="text" icon={<TranslationOutlined />} />
    </Dropdown>
  )
}
