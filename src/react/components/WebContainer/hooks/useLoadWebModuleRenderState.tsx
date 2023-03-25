import { useEffect, useRef } from "react";

import { RenderComponentProps } from "../renderRegistory";
import { getPathURLByURLObject, getAbsPathURLObject, urlSearchParamsToObject } from "../../../../utils/url";
import { getWebModuleEntryUrl, importWebModule } from "../../../../utils/webModule";

export function useLoadWebModuleRenderState(props: RenderComponentProps) {
  const ref = useRef<HTMLElement>();

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const container = ref.current as HTMLElement;
    let webModuleInstClean: CallableFunction | null = null;
    // load and create an instance.
    (async () => {
      props.onStart?.();
      try {
        let sourceUrl = props.url as string;
        // here is the webmodule name
        if (sourceUrl.startsWith("@")) {
          sourceUrl = await getWebModuleEntryUrl(sourceUrl)
        }
        const targetUrl = getAbsPathURLObject(sourceUrl);
        const targetUrlSearchParams = urlSearchParamsToObject(targetUrl.searchParams);
        const webModuleUrl = getPathURLByURLObject(targetUrl);
        const webModule = await importWebModule(webModuleUrl);
        if (typeof webModule.factory === "function") {
          webModuleInstClean = await webModule.factory({
            container,
            webModule,
            params: targetUrlSearchParams
          })
          props.onLoad?.();
        }
      } catch(err) {
        props.onError?.();
      }
    })();
    return () => {
      webModuleInstClean?.();
    }
  }, [props.url])

  return ref;
}
