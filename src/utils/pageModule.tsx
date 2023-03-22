import React from 'react';
import ReactDOM from 'react-dom/client';
import { WebModuleFactory } from "./webModule";
import PageShell from 'components/PageShell/PageShell';
import NotFoundPage from 'components/NotFoundPage/NotFoundPage';

interface CreatePageFactoryOpts {
  loadPageComponent(pageName?: string): Promise<React.LazyExoticComponent<React.ComponentType<any>>>
}

export function createPageFactory(opts: CreatePageFactoryOpts): WebModuleFactory {
  return async (context) => {
    let PageComponent: React.ComponentType = NotFoundPage;
    try {
      PageComponent = await opts.loadPageComponent(context?.params?.page);
    } catch (err) { /* empty */ }

    const render = ReactDOM.createRoot(context?.container ?? document.getElementById('root') ?? document.body);
    render.render(
      <React.StrictMode>
        <PageShell>
          <PageComponent />
        </PageShell>
      </React.StrictMode>
    );

    return () => {
      render.unmount();
    }
  }
}
