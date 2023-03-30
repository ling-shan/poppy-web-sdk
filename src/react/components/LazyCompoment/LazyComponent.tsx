import React, { ReactNode } from "react";
import { Suspense } from "react";

interface LazyComponentProps {
  fallback?: ReactNode
}

export function createLazyComponent(lazy: Promise<any>, fallback?: ReactNode) {
  const Component = React.lazy(() => {
    return lazy
  });

  function Wrapper(props: LazyComponentProps ) {
    return (
      <Suspense fallback={fallback ?? props.fallback}>
        <Component />
      </Suspense>
    );
  }

  return Wrapper;
}
