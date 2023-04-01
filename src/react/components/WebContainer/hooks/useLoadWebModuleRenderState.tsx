import { useEffect, useRef } from "react";

import { RenderComponentProps } from "../renderRegistory";
import { getPathURLByURLObject, getAbsPathURLObject, urlSearchParamsToObject } from "../../../../utils/url";
import { webModuleLoader } from "../../../../utils/webModuleLoader";

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
          sourceUrl = await webModuleLoader.getWebModuleEntryUrl(sourceUrl)
        }
        const targetUrl = getAbsPathURLObject(sourceUrl);
        const params = {
          ...urlSearchParamsToObject(targetUrl.searchParams),
          ...props.params,
        }
        const webModuleUrl = getPathURLByURLObject(targetUrl);
        const webModule = await webModuleLoader.importWebModule(webModuleUrl);
        if (typeof webModule.factory === "function") {
          webModuleInstClean = await webModule.factory({
            container,
            webModule,
            params: params
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.url])

  return ref;
}
