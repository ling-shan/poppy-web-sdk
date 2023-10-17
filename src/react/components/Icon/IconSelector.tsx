import { useEffect, useState } from 'react'
import { Input, Modal, Tabs } from 'antd'
import classnames from 'classnames'
import { Icon } from './Icon'
import classes from './IconSelector.module.css'
import React from 'react'
import { useI18nMessage } from '../../hooks/useI18nMessage'

//TODO this title text need to covered i18n

const iconTypeArray: { key: string; title: string; icons: string[] }[] = [
  {
    key: 'directional',
    title: 'ui.icon-selector-icon-arrow.title',
    icons: [
      'step-backward',
      'step-forward',
      'fast-backward',
      'fast-forward',
      'shrink',
      'arrows-alt',
      'down',
      'up',
      'left',
      'right',
      'caret-up',
      'caret-down',
      'caret-left',
      'caret-right',
      'up-circle',
      'down-circle',
      'left-circle',
      'right-circle',
      'double-right',
      'double-left',
      'vertical-left',
      'vertical-right',
      'forward',
      'backward',
      'rollback',
      'enter',
      'retweet',
      'swap',
      'swap-left',
      'swap-right',
      'arrow-up',
      'arrow-down',
      'arrow-left',
      'arrow-right',
      'play-circle',
      'up-square',
      'down-square',
      'left-square',
      'right-square',
      'login',
      'logout',
      'menu-fold',
      'menu-unfold',
      'border-bottom',
      'border-inner',
      'border-outer',
      'border-left',
      'border-right',
      'border-top',
      'pic-center',
      'pic-left',
      'pic-right',
      'radius-upleft',
      'radius-upright',
      'fullscreen',
      'fullscreen-exit',
    ],
  },
  {
    key: 'suggested',
    title: 'ui.icon-selector-icon-suggestion.title',
    icons: [
      'question',
      'question-circle',
      'plus',
      'plus-circle',
      'pause',
      'pause-circle',
      'minus',
      'minus-circle',
      'plus-square',
      'minus-square',
      'info',
      'info-circle',
      'exclamation',
      'close',
      'close-circle',
      'close-square',
      'check',
      'check-circle',
      'check-square',
      'clock-circle',
      'warning',
      'issues-close',
      'stop',
    ],
  },
  {
    key: 'editor',
    title: 'ui.icon-selector-icon-edit.title',
    icons: [
      'edit',
      'form',
      'copy',
      'scissor',
      'delete',
      'snippets',
      'diff',
      'highlight',
      'align-center',
      'align-left',
      'align-right',
      'bg-colors',
      'bold',
      'italic',
      'underline',
      'strikethrough',
      'redo',
      'undo',
      'zoom-in',
      'zoom-out',
      'font-colors',
      'font-size',
      'line-height',
      'dash',
      'small-dash',
      'sort-ascending',
      'drag',
      'ordered-list',
      'unordered-list',
      'radius-setting',
      'column-width',
      'column-height',
    ],
  },
  {
    key: 'data',
    title: 'ui.icon-selector-icon-data.title',
    icons: [
      'area-chart',
      'pie-chart',
      'bar-chart',
      'dot-chart',
      'line-chart',
      'radar-chart',
      'heat-map',
      'fall',
      'rise',
      'stock',
      'box-plot',
      'fund',
      'sliders',
    ],
  },
  {
    key: 'brand_logo',
    title: 'ui.icon-selector-icon-website.title',
    icons: [
      'account-book',
      'alert',
      'api',
      'appstore',
      'audio',
      'bank',
      'bell',
      'book',
      'bug',
      'bulb',
      'calculator',
      'build',
      'calendar',
      'camera',
      'car',
      'carry-out',
      'cloud',
      'code',
      'compass',
      'contacts',
      'container',
      'control',
      'credit-card',
      'crown',
      'dashboard',
      'database',
      'dislike',
      'environment',
      'experiment',
      'eye-invisible',
      'eye',
      'file-add',
      'file-excel',
      'file-image',
      'file-markdown',
      'file-pdf',
      'file-ppt',
      'file-text',
      'file-unknown',
      'file-word',
      'file-zip',
      'file',
      'filter',
      'fire',
      'flag',
      'folder-add',
      'folder',
      'folder-open',
      'frown',
      'funnel-plot',
      'gift',
      'hdd',
      'heart',
      'home',
      'hourglass',
      'idcard',
      'insurance',
      'interaction',
      'layout',
      'like',
      'lock',
      'mail',
      'medicine-box',
      'meh',
      'message',
      'mobile',
      'money-collect',
      'pay-circle',
      'notification',
      'phone',
      'picture',
      'play-square',
      'printer',
      'profile',
      'project',
      'pushpin',
      'property-safety',
      'read',
      'reconciliation',
      'red-envelope',
      'rest',
      'rocket',
      'save',
      'schedule',
      'security-scan',
      'setting',
      'shop',
      'shopping',
      'skin',
      'smile',
      'sound',
      'star',
      'switcher',
      'tablet',
      'tag',
      'tags',
      'tool',
      'thunderbolt',
      'trophy',
      'unlock',
      'usb',
      'video-camera',
      'wallet',
      'apartment',
      'audit',
      'barcode',
      'bars',
      'block',
      'border',
      'branches',
      'ci',
      'cloud-download',
      'cloud-server',
      'cloud-sync',
      'cloud-upload',
      'cluster',
      'coffee',
      'copyright',
      'deployment-unit',
      'desktop',
      'disconnect',
      'dollar',
      'download',
      'ellipsis',
      'euro',
      'exception',
      'export',
      'file-done',
      'file-jpg',
      'file-protect',
      'file-sync',
      'file-search',
      'fork',
      'gateway',
      'global',
      'gold',
      'history',
      'import',
      'inbox',
      'key',
      'laptop',
      'link',
      'line',
      'loading',
      'man',
      'menu',
      'monitor',
      'more',
      'number',
      'percentage',
      'paper-clip',
      'pound',
      'poweroff',
      'pull-request',
      'qrcode',
      'reload',
      'safety',
      'robot',
      'scan',
      'search',
      'select',
      'shake',
      'share-alt',
      'shopping-cart',
      'solution',
      'sync',
      'table',
      'team',
      'to-top',
      'trademark',
      'transaction',
      'upload',
      'user-add',
      'user-delete',
      'usergroup-add',
      'user',
      'wifi',
      'woman',
    ],
  },
  {
    key: 'application',
    title: 'ui.icon-selector-icon-brand.title',
    icons: [
      'android',
      'apple',
      'windows',
      'ie',
      'chrome',
      'github',
      'aliwangwang',
      'dingding',
      'weibo-square',
      'weibo-circle',
      'taobao-circle',
      'html5',
      'weibo',
      'twitter',
      'wechat',
      'youtube',
      'alipay-circle',
      'taobao',
      'skype',
      'qq',
      'medium-workmark',
      'gitlab',
      'medium',
      'linkedin',
      'google-plus',
      'dropbox',
      'facebook',
      'codepen',
      'code-sandbox',
      'amazon',
      'google',
      'codepen-circle',
      'alipay',
      'ant-design',
      'ant-cloud',
      'aliyun',
      'zhihu',
      'slack',
      'slack-square',
      'behance',
      'behance-square',
      'dribbble',
      'dribbble-square',
      'instagram',
      'yuque',
      'alibaba',
      'yahoo',
      'reddit',
      'sketch',
    ],
  },
]

export type IconSelectProps = {
  value?: string
  onChange?: (val?: string) => void
}

export const IconSelect = (props: IconSelectProps) => {
  const { value, onChange } = props
  const [visible, setVisible] = useState(false)
  const [selectIcon, setSelectIcon] = useState(value)

  const i18nMessage =  useI18nMessage();

  useEffect(() => {
    if (visible) {
      setSelectIcon(value)
    }
  }, [value, visible])

  const items = iconTypeArray.map((item) => {
    const { key, icons, title } = item
    return {
      label: i18nMessage.formatMessage(title),
      key,
      children: (
        <ul className={classes.iconUl} key={`icon-select-ul-${key}`}>
          {icons.map((icon) => {
            return (
              <li
                className={classnames(classes.iconLi, {
                  [classes.active]: selectIcon && selectIcon === icon,
                })}
                key={`icon-select-li-${key}-${icon}`}
                onClick={() => setSelectIcon(icon)}
              >
                <Icon
                  key={`icon-select-icon-${key}-${icon}`}
                  name={icon}
                  style={{ fontSize: 36 }}
                />
              </li>
            )
          })}
        </ul>
      ),
    }
  })

  return (
    <>
      <Input
        className="pro-field-md"
        readOnly
        value={value}
        title="请选择ICON"
        placeholder="请选择ICON"
        style={{ userSelect: 'none' }}
        prefix={value && value.length > 0 ? <Icon name={value} /> : ''}
        suffix={
          <Icon
            name="close"
            style={{ display: value ? 'block' : 'none' }}
            onClick={() => {
              onChange?.('')
            }}
          />
        }
        onClick={() => setVisible(true)}
      />

      <Modal
        open={visible}
        onCancel={() => setVisible(false)}
        onOk={() => {
          onChange?.(selectIcon)
          setVisible(false)
        }}
        width="800px"
      >
        <Tabs style={{ userSelect: 'none' }} items={items} />
      </Modal>
    </>
  )
}
