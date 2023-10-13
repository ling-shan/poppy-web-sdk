import React, { ComponentType, ReactElement, useContext } from 'react';
import ReactDOM from 'react-dom/client';
import { WebModuleFactoryContext } from "../utils/webModuleLoader";
import WebModule from './components/WebModule';
import { startWebModule as originStartWebModule } from '../utils/webModuleProvider';

type LazyReactElementFactory = (context?: WebModuleFactoryContext) => Promise<ReactElement>

interface StartWebModuleOpts {
  initializer?: () => void
  wrapper?: ComponentType
  view?: ReactElement | LazyReactElementFactory
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const WebModuleContext = React.createContext<WebModuleFactoryContext| undefined>(undefined);

export function useWebModuleContext() {
  return useContext(WebModuleContext);
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
      <WebModuleContext.Provider value={context}>
        <WebModule initialize={opts.initializer}>
          <Wrapper>
          { webModuleContent }
          </Wrapper>
        </WebModule>
      </WebModuleContext.Provider>
    );

    return () => {
      render.unmount();
    }
  })
}


