import React from "react";
import { Button, Result } from "antd";
import { useFormatMessage } from "../../hooks/useFormatMessage";
import messageKeys from "../../../utils/messageKeys";

interface ErrorStateProps {
  onRetry?: () => void
}

export function ErrorState(props: ErrorStateProps) {
  return (
    <Result
      status="error"
      title={useFormatMessage(messageKeys.CommonErrorStateTitle)}
      subTitle={messageKeys.CommonErrorStatesubTitle}
      extra={<Button
          onClick={props.onRetry}
          type="primary">{useFormatMessage(messageKeys.CommonRetryText)}</Button>}
    />
  )
}

export default ErrorState;
