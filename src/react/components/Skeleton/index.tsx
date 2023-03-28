import { HTMLAttributes } from 'react'
import { Result, Empty, Button, Spin } from 'antd'
import classnames from 'classnames'
import React from 'react'

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  error?: unknown
  loading?: boolean
  onReload?: () => void
  empty?: boolean
}

export function Skeleton(props: SkeletonProps) {
  const { className, error, loading, empty, children, onReload } = props
  // const classes = classnames(
  //   css`
  //     width: 100%;
  //     height: 100%;
  //     display: flex;
  //     flex-direction: column;
  //     justify-content: center;
  //     align-items: center;
  //   `,
  //   className,
  // )

  // loading
  if (loading) {
    return (
      <div>
        <Spin spinning size="large" />
      </div>
    )
  }

  // 错误
  if (error) {
    return (
      <Result
        status="error"
        extra={[
          <Button type="primary" key="reload" onClick={onReload}>
          </Button>,
        ]}
      />
    )
  }

  // empty
  if (empty) {
    return (
      <div>
        <Empty />
      </div>
    )
  }

  return <>{children}</>
}
