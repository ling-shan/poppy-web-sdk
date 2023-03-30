import React from 'react'
import { Spin } from 'antd'

import styles from './LoadingState.module.css'

export function LoadingState() {
  return (
    <div className={styles.main}>
      <Spin size='large' />
    </div>
  )
}

export default LoadingState
