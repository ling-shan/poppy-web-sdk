import { WebModule, WebModuleFactory } from "./webModuleLoader";

let currentWebModule: WebModule | null;

function initWebModule() {
  let currentScript = document.currentScript;
  if (!currentScript) {
    const scripts = document.querySelectorAll("script");
    if (scripts && scripts.length > 0) {
      currentScript = scripts[scripts.length - 1];
    }
  }

  const webModuleIdentify = currentScript?.getAttribute("data-identify") ?? "";
  if (!webModuleIdentify) {
    return;
  }

  currentWebModule = window.webModuleLoader.get(webModuleIdentify) ?? null;
  if (!currentWebModule) {
    return;
  }

  try {
    __webpack_public_path__ = currentWebModule.publicPath ?? "./";
  // eslint-disable-next-line no-empty
  } catch (err) {
  }
}

initWebModule();

export function startWebModule(factory: WebModuleFactory): void {
  if (!currentWebModule) {
    factory();
    return;
  }
  currentWebModule.factory = factory;
}


