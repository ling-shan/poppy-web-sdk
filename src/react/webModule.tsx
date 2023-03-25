import React, { ComponentType, ReactElement } from 'react';
import ReactDOM from 'react-dom/client';
import { WebModuleFactoryContext, startWebModule } from "../utils/webModule";
import WebModule from './components/WebModule';

type LazyReactElementFactory = (context?: WebModuleFactoryContext) => Promise<ReactElement>

interface WebModuleOpts {
  wrapper?: ComponentType
  view?: ReactElement | LazyReactElementFactory
}

export function startup(opts: WebModuleOpts) {
  startWebModule(async (context) => {
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


