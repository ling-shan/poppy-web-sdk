import { Button, Result } from 'antd';
import React from 'react'
import { ErrorBoundary as CommonErrorBoundary } from "react-error-boundary";
import { useFormatMessage } from 'react/hooks/useFormatMessage';

export function ErrorBoundary() {
  const commonErrorTittle = useFormatMessage("");
  const commonErrorSubTittle = useFormatMessage("");
  const commonRefreshText = useFormatMessage("");

  const fallback = (
    <Result
      status="error"
      title={commonErrorTittle}
      subTitle={commonErrorSubTittle}
      extra={<Button type="primary">{commonRefreshText}</Button>}
    />
  );

  return (
    <CommonErrorBoundary fallback={fallback} />
  );
}

export default ErrorBoundary;
