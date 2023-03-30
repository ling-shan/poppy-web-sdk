import React, { useCallback } from "react";
import { Button, Result } from "antd";
import { useI18nMessage } from "../../hooks/useI18nMessage";
import I18nMessageKeys from "../../../utils/I18nMessageKeys";

import styles from './ErrorState.module.css'

interface ErrorStateProps {
  onRetry?: () => void
}

export function ErrorState(props: ErrorStateProps) {
  const retryCallback = useCallback(
    () => {
      if (props.onRetry) {
        props.onRetry();
      } else {
        window.location.reload();
      }
    },
    [props],
  )

  const i18n = useI18nMessage();

  return (
    <div className={styles.main}>
      <Result
        status="500"
        title={i18n.formatMessage(I18nMessageKeys.CommonErrorStateTitle)}
        subTitle={i18n.formatMessage(I18nMessageKeys.CommonErrorStateSubTitle)}
        extra={<Button
            onClick={retryCallback}
            type="primary">{i18n.formatMessage(I18nMessageKeys.CommonRetryText)}</Button>}
      />
    </div>
  )
}

export default ErrorState;
