import React, { PropsWithChildren } from 'react';
import './PageShell.module.css';
import { ConfigProvider } from 'antd';

export function PageShell(props: PropsWithChildren) {
  return (
    <ConfigProvider>
      { props.children }
    </ConfigProvider>
  );
}

export default PageShell;
