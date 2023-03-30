import React, { PropsWithChildren } from 'react'
import { ErrorBoundary as CommonErrorBoundary } from "react-error-boundary";

import ErrorState from '../ErrorState';

export function ErrorBoundary(props: PropsWithChildren) {
  const fallback = (
    <ErrorState />
  )

  return (
    <CommonErrorBoundary fallback={fallback}>
      { props.children }
    </CommonErrorBoundary>
  );
}

export default ErrorBoundary;
