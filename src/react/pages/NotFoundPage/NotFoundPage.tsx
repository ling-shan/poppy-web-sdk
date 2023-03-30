import React from 'react';
import {  Result } from 'antd';

import { useI18nMessage } from '../../hooks/useI18nMessage';
import I18nMessageKeys from '../../../utils/I18nMessageKeys';

import styles from './NotFoundPage.module.css'
import { useDocumentTitleEffect } from '../../hooks/useDocumentTitleEffect';

export default function NotFoundPage() {
  const i18n = useI18nMessage();
  useDocumentTitleEffect(I18nMessageKeys.NotFoundPageErrorTitle);
  return (
    <div className={styles.main}>
      <Result
        status="404"
        title={i18n.formatMessage(I18nMessageKeys.NotFoundPageErrorTitle)}
        subTitle={i18n.formatMessage(I18nMessageKeys.NotFoundPageErrorSubTitle)}
    />
    </div>
  );
}
