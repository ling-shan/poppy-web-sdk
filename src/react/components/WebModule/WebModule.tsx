import React, { PropsWithChildren } from 'react';
import Application from '../Application';

export function WebModule(props: PropsWithChildren) {
  return (
    <Application>
      { props.children }
    </Application>
  );
}

export default WebModule;
