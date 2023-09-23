import React, { useEffect, useState } from 'react'
import { getAbsPathURLObject, getPathURLByURLObject, getURLSearchParams, objectToSearchParamsStr } from '../../../utils/url'
import { RenderTypes } from './renderRegistory'

import { ProxyRender } from './renders/ProxyRender';

interface WebContainerProps {
  className?: string
  url?: string | null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: Record<string, any>
  onLoad?: () => void
  onStart?: () => void
  onError?: () => void
}

/**
 * WebContainer is an micro-frontend solution, which is support for mutiple mime type
 *
 * Resource render mapping
 *
 * 1. xxxxx.html?name=3&page=test -> html render
 * 2. xxxxx.md | makrdown -> markdown render
 * 3. xxxxx.assets-manifest.json?xxx  ->
 * 4. xxxxx.remote-entry.js?xxxx=xxxx
 *
 * Example:
 *
 * 1. https://oss.hecode.cc/poppy-assets/LongMusicB.html
 * 2. https://oss.hecode.cc/poppy-assets/longMusicB.md
 * 3. https://oss.hecode.cc/poppy-assets/react-app-demo/asset-manifest.json
 *
 * @param porps
 * @returns
 */
export function WebContainer(props: WebContainerProps) {
  const [renderType, setRenderType] = useState(RenderTypes.None);

  // detect the render
  useEffect(() => {
    let pathUrl = props.url ?? "";
    if (pathUrl.startsWith("@") && pathUrl.length > 1) {
      if (props.params) {
        const searchParamsStr = objectToSearchParamsStr(props.params);
        if (searchParamsStr) {
          if (pathUrl.includes('?')) {
            pathUrl = pathUrl + '&' + searchParamsStr;
          } else {
            pathUrl = pathUrl + '?' + searchParamsStr;
          }
        }
      }
      setRenderType(RenderTypes.WebModule);
    } else {
      const searchParams = getURLSearchParams(pathUrl);
      const renderType = searchParams.get("renderType");
      pathUrl = getPathURLByURLObject(getAbsPathURLObject(pathUrl));
      if (renderType === RenderTypes.HTML || pathUrl.endsWith(".html") || pathUrl.endsWith(".HTML")) {
        setRenderType(RenderTypes.HTML);
      } else if (renderType === RenderTypes.WebModule || pathUrl.endsWith("asset-manifest.json")) {
        setRenderType(RenderTypes.WebModule);
      } else if (renderType === RenderTypes.Markdown || pathUrl.endsWith(".md") || pathUrl.endsWith(".MD") || pathUrl.endsWith(".markdown")) {
        setRenderType(RenderTypes.Markdown);
      } else if (renderType === RenderTypes.RichText || pathUrl.endsWith(".rtext")) {
        setRenderType(RenderTypes.RichText);
      } else {
        setRenderType(RenderTypes.None);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.url]);

  return (
    <div className={props.className}>
      <ProxyRender
        renderType={renderType}
        url={props.url ?? ""}
        params={props.params}
        onLoad={props.onLoad}
        onError={props.onError}
        onStart={props.onStart}/>
    </div>
  );
}

