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

const statesMap = {
  'unknow-error': {
    status: "500",
    title: I18nMessageKeys.ErrorStateUnknownErrorTitle,
    subTitle: I18nMessageKeys.ErrorStateUnknownErrorSubTitle,
  },
  'notfound': {
    status: "404",
    title: I18nMessageKeys.ErrorStateNotFoundErrorTitle,
    subTitle: I18nMessageKeys.ErrorStateNotFoundSubTitle,
  },
  'no-permission': {
    status: "403",
    title: I18nMessageKeys.ErrorStateNoPermissionTitle,
    subTitle: I18nMessageKeys.ErrorStateNoPermissionSubTitle,
  }
}

export function ErrorState(props: ErrorStateProps) {
  const stateType = props.stateType ?? 'unknow-error';
  const i18nMessage = useI18nMessage();

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

  const state = statesMap[stateType] ?? statesMap['unknow-error'];
  const titleText = i18nMessage.formatMessage(state.title);
  const subTitleText = i18nMessage.formatMessage(state.subTitle);

  const retryButton = useMemo(() => {
    if (props.onRetry === false) {
      return null;
    }

    <Button
      onClick={retryCallback}
      type="primary">
        {i18nMessage.formatMessage(I18nMessageKeys.CommonRetryText)}
    </Button>

  }, [i18nMessage, props.onRetry, retryCallback])

  return (
    <div className={styles.main}>
      <Result
        status={state.status as any}
        title={titleText}
        subTitle={subTitleText}
        extra={retryButton}
      />
    </div>
  )
}

export default ErrorState;
