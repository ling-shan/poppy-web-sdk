import React, { useCallback, useMemo } from "react";
import { Button, Result } from "antd";
import { useI18nMessage } from "../../hooks/useI18nMessage";
import I18nMessageKeys from "../../../utils/I18nMessageKeys";

import styles from './ErrorState.module.css'

type ErrorStateType = 'unknow-error' | 'notfound' | 'no-permission'

interface ErrorStateProps {
  stateType?: ErrorStateType
  onRetry?: (() => void) | false
}

const messagesMap = {
  'unknow-error': {
    title: I18nMessageKeys.CommonErrorStateTitle,
    subTitle: I18nMessageKeys.CommonErrorStateSubTitle,
  },
  'notfound': {
    title: I18nMessageKeys.CommonNotFoundStateTitle,
    subTitle: I18nMessageKeys.CommonNotFoundStateSubTitle,
  },
  'no-permission': {
    title: I18nMessageKeys.CommonNoPermissionStateTitle,
    subTitle: I18nMessageKeys.CommonNoPermissionStateSubTitle,
  }
}

export function ErrorState(props: ErrorStateProps) {
  const stateType = props.stateType ?? 'unknow-error';


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

  const messgaes = messagesMap[stateType] ?? messagesMap['unknow-error'];

  const retryButton = useMemo(() => {
    if (props.onRetry === false) {
      return null;
    }

    <Button
      onClick={retryCallback}
      type="primary">
        {i18n.formatMessage(I18nMessageKeys.CommonRetryText)}
    </Button>

  }, [i18n, props.onRetry, retryCallback])

  return (
    <div className={styles.main}>
      <Result
        status="500"
        title={messgaes.title}
        subTitle={messgaes.subTitle}
        extra={retryButton}
      />
    </div>
  )
}

export default ErrorState;
