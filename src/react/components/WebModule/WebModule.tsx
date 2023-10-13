import React, { PropsWithChildren } from 'react';
import Application, { AppInitializer } from '../Application';

export function WebModule(props: PropsWithChildren<AppInitializer>) {
  return (
    <Application initialize={props.initialize}>
      { props.children }
    </Application>
  );
}

export default WebModule;
