/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseURL, getAbsURLByBaseURL } from "./url";

type WebModuleCleanFunction = CallableFunction;

export interface WebModuleFactoryContext {
  webModule: WebModule
  container?: HTMLElement
  params?: Record<string, any>
  [key: string]: any
}

export type WebModuleFactory = (context?: WebModuleFactoryContext) => Promise<WebModuleCleanFunction>

export interface WebModule {
  publicPath: string;
  moduleName: string;
  factory: WebModuleFactory | null
}

interface AssetAttributes {
  tag: "script" | "link"
  [key: string]: string;
}

const DefaultWebModuleProviderUrl = process.env.REACT_APP_WEB_MODULE_PROVIDER_URL ??
(window as any).WEB_MODULE_PROVIDER_URL ??
"http://poppy-api.lingyuan-tech.com/api/poppy/v1/web-modules";

export interface WebModuleLoader {
  getWebModuleProviderUrl(): string;
  setWebModuleProviderUrl(url: string): void;

  getWebModuleEntryUrl(webModuleName: string): Promise<string>

  get(webModuleUrl: string): WebModule | undefined;
  importWebModule(webModuleUrl: string): Promise<WebModule>
}

declare global {
  interface Window {
    webModuleLoader: WebModuleLoader
  }
}

class WebModuleLoaderImpl implements WebModuleLoader {
  private webModuleProviderUrl:string
  private loadings: Record<string, Promise<void> | undefined>
  private modules: Record<string, WebModule>

  constructor () {
    this.webModuleProviderUrl = DefaultWebModuleProviderUrl;
    this.loadings = {};
    this.modules = {};
  }

  getWebModuleProviderUrl() {
    return this.webModuleProviderUrl;
  }

  setWebModuleProviderUrl(url: string) {
    this.webModuleProviderUrl = url;
  }

  async getWebModuleEntryUrl(webModuleName: string): Promise<string> {
    if (webModuleName.startsWith("@")) {
      webModuleName = webModuleName.substring(1);
    }

    const response = await window.fetch(`${this.webModuleProviderUrl}/entry-url/${webModuleName}`, {
      headers: {
        "Cache-Control": "no-cache"
      }
    });
    if (!response.ok) {
      throw new Error("NetworkError");
    }

    const responseData = await response.json();
    const entryUrl = responseData.data;
    if (!entryUrl) {
      throw new Error("NetworkError");
    }
    return entryUrl;
  }

  get(webModuleUrl: string) {
    return this.modules[webModuleUrl] ?? undefined;
  }

  async importWebModule(webModuleUrl: string): Promise<WebModule> {
    if (this.loadings[webModuleUrl]) {
      await this.loadings[webModuleUrl];
      return this.get(webModuleUrl);
    }

    const publicPath = baseURL(webModuleUrl);

    const webModule = {
      moduleName: webModuleUrl,
      publicPath,
      factory: null,
    };

    this.modules[webModuleUrl] = webModule;
    const loadWebModulePromise = this.loadWebModule(webModuleUrl);
    this.loadings[webModuleUrl] = loadWebModulePromise;
    await loadWebModulePromise;
    return webModule;
  }

  private async loadWebModule(webModuleUrl: string) {
    const assets = await this.loadHTMLOrAssetManifest(webModuleUrl);
    for (const asset of assets) {
      // const ext = (/\.(css|js)$/.exec(asset) || [])[1];
      // eslint-disable-next-line no-debugger
      if (asset.tag === "script") {
        await this.loadJavaScript(asset);
      } else if (asset.tag === "link") {
        await this.loadCss(asset);
      }
    }
  }

  private loadJavaScript(asset: AssetAttributes) {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script") as HTMLScriptElement;
      script.type = "text/javascript";
      script.async = true;

      script.onerror = (err) => {
        reject(err);
      };
      script.onload = function(){
        resolve(undefined);
      }
      script.src = asset.url;
      script.type = asset.type;
      script.setAttribute("data-identify", asset["data-identify"])
      document.head.appendChild(script);
    })
  }

  private async loadCss(asset: AssetAttributes) {
    return new Promise((resolve, reject) => {
      const script = document.createElement("link") as HTMLLinkElement;
      script.rel = "stylesheet";
      script.onerror = (err) => {
        reject(err);
      };
      script.onload = function(){
        resolve(undefined);
      }
      script.href = asset["href"];
      document.head.appendChild(script);
    })
  }

  private async loadHTMLOrAssetManifest(url: string): Promise<AssetAttributes[]> {
    const responseResult = await fetch(url, {
      headers: {
        "Cache-Control": "no-cache"
      }
    });

    const baseUrl = baseURL(url);

    const contentType = responseResult.headers.get("Content-Type");
    const results: AssetAttributes[] = [];
    // for html
    if (contentType && contentType.includes("text/html")) {
      const htmlContent = await responseResult.text();
      const htmlDoc = new DOMParser().parseFromString(htmlContent, "text/html");
      const scriptList = htmlDoc.querySelectorAll("script[src]");
      scriptList.forEach((element) => {
        const jsElement = (element as HTMLScriptElement);
        results.push({
          tag: "script",
          url: getAbsURLByBaseURL(jsElement.src, baseUrl),
          async: "",
          type: jsElement.type ?? "text/javascript",
          "data-identify": url,
        });
      })

      const cssList = htmlDoc.querySelectorAll('link[rel="stylesheet"]');
      cssList.forEach((element) => {
        results.push({
          tag: "link",
          href: getAbsURLByBaseURL((element as HTMLLinkElement).href, baseUrl),
        });
      })
      return results;
    }

    // for asset-manifest.json
    if (contentType && contentType.includes("application/json")) {
      const jsonContent = await responseResult.json();
      const entrypoints: string[] = jsonContent?.entrypoints ?? [];
      entrypoints.forEach((entrypoint) => {
        const ext = (/\.(css|js)$/.exec(entrypoint) || [])[1];
        const assetsUrl = getAbsURLByBaseURL(entrypoint, baseUrl);
        if (ext === "js") {
          results.push({
            tag: "script",
            url: assetsUrl,
            async: "",
            type: "text/javascript",
            "data-identify": url,
          });
        } else if (ext === "css") {
          results.push({
            tag: "link",
            href: assetsUrl,
          })
        }
      })
      return results;
    }

    throw new Error("InvalidEntry");
  }
}

export const webModuleLoader = window.webModuleLoader ?? new WebModuleLoaderImpl();

if (!window.webModuleLoader) {
  window.webModuleLoader = webModuleLoader;
}




