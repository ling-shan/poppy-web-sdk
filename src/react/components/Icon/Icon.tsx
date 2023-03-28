import React from 'react'
import { icons } from './icons'
import { IconComponentProps } from '@ant-design/icons/lib/components/Icon'

const convertTypeToIconPath = (type: string) => {
  let path = ''

  type.split('-').forEach((t) => {
    path = `${path}${t.substr(0, 1).toLocaleUpperCase()}${t
      .substring(1)
      .toLocaleLowerCase()}`
  })

  return `${path}Outlined`
}

export interface IconProps extends IconComponentProps {
  name: string
}

export function Icon(props: IconProps) {
  const { name, ...rest } = props

  const IconType = icons[name] || icons[convertTypeToIconPath(name)]

  if (!IconType) {
    return null
  }

  return <IconType {...rest} />
}
