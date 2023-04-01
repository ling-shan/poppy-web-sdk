import React, { useEffect, useState } from 'react'
import { getAbsPathURLObject, getPathURLByURLObject, objectToSearchParamsStr } from '../../../utils/url'
import { RenderTypes } from './renderRegistory'

import { ProxyRender } from './renders/ProxyRender';

interface WebContainerProps {
  className?: string
  url?: string | null
  params?: Record<string, string>
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
      pathUrl = getPathURLByURLObject(getAbsPathURLObject(pathUrl));
      if (pathUrl.endsWith(".html")) {
        setRenderType(RenderTypes.HTML);
      } else if (pathUrl.endsWith("asset-manifest.json")) {
        setRenderType(RenderTypes.WebModule);
      } else if (pathUrl.endsWith(".md") || pathUrl.endsWith(".markdown")) {
        setRenderType(RenderTypes.Markdown);
      } else if (pathUrl.endsWith(".rtext")) {
        setRenderType(RenderTypes.RichText);
      } else {
        setRenderType(RenderTypes.None);
      }
    }
  }, [props.url]);

  return (
    <div className={props.className}>
      <ProxyRender
        renderType={renderType}
        url={props.url ?? ""}
        onLoad={props.onLoad}
        onError={props.onError}
        onStart={props.onStart}/>
    </div>
  );
}

