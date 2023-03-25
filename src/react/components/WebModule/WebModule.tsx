import React, { PropsWithChildren } from 'react';
import './WebModule.module.css';
import { ConfigProvider } from 'antd';

export function WebModule(props: PropsWithChildren) {
  return (
    <ConfigProvider>
      { props.children }
    </ConfigProvider>
  );
}

export default WebModule;
