import React from 'react'
import { Empty } from 'antd';

import styles from './ErrorState.module.css'

export function EmptyState() {
  return (
    <div className={styles.main}>
      <Empty />
    </div>
  )
}

export default EmptyState;
