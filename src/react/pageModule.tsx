import React from 'react';
import ReactDOM from 'react-dom/client';
import { WebModuleFactory } from "./webModule";
import PageShell from 'react/components/PageShell/PageShell';
import NotFoundPage from 'react/components/NotFoundPage/NotFoundPage';

interface CreatePageFactoryOpts {
  loadPageComponent(pageName: string): Promise<React.LazyExoticComponent<React.ComponentType<any>>>
}

export function createPageFactory(opts: CreatePageFactoryOpts): WebModuleFactory {
  return async (context) => {
    let PageComponent: React.ComponentType = NotFoundPage;

    let pageName = context?.params?.page;
    if (!pageName) {
      const urlSearchParams = new URLSearchParams(window.location.search);
      pageName = urlSearchParams.get("page") ?? undefined;
    }

    if (!pageName) {
      pageName = "notfound";
    }

    try {
      PageComponent = await opts.loadPageComponent(pageName);
    } catch (err) {
      PageComponent = NotFoundPage;
    }

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
