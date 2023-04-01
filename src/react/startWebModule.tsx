import React, { ComponentType, ReactElement } from 'react';
import ReactDOM from 'react-dom/client';
import { WebModuleFactoryContext } from "../utils/webModuleLoader";
import WebModule from './components/WebModule';
import { startWebModule as originStartWebModule } from '../utils/webModuleProvider';

type LazyReactElementFactory = (context?: WebModuleFactoryContext) => Promise<ReactElement>

interface StartWebModuleOpts {
  wrapper?: ComponentType
  view?: ReactElement | LazyReactElementFactory
}

export function startWebModule(opts: StartWebModuleOpts) {
  originStartWebModule(async (context) => {
    let webModuleContent: ReactElement = <></>;
    if (React.isValidElement(opts.view)) {
      webModuleContent = opts.view;
    } else if (typeof opts.view === "function") {
      webModuleContent = await opts.view(context);
    }

    const Wrapper = opts.wrapper ?? React.Fragment;
    const render = ReactDOM.createRoot(context?.container ?? document.getElementById('root') ?? document.body);
    render.render(
      <WebModule>
        <Wrapper>
        { webModuleContent }
        </Wrapper>
      </WebModule>
    );

    return () => {
      render.unmount();
    }
  })
}


