import React from 'react'
import { ErrorBoundary as CommonErrorBoundary } from "react-error-boundary";
import ErrorState from '../ErrorState';

export function ErrorBoundary() {
  const fallback = (
    <ErrorState onRetry={() => { window.location.reload() }} />
  )

  return (
    <CommonErrorBoundary fallback={fallback} />
  );
}

export default ErrorBoundary;
