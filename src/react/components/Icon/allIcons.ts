import * as antdIcons from '@ant-design/icons'

export const icons: Record<string, any> = {
  ...antdIcons,
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
delete icons.default

export const iconNames = Object.keys(icons)
