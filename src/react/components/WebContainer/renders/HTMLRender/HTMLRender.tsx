import React, { ReactEventHandler, useCallback, useEffect } from 'react';

import { RenderComponentProps, RenderTypes, registerRender } from '../../renderRegistory';

import styles from "./HTMLRender.module.css";

function HTMLRender(props: RenderComponentProps) {
  const  {url, onLoad, onStart } = props;

  useEffect(() => {
    onStart?.();
  }, [onStart, url]);

  const onLoadedHandel: ReactEventHandler = useCallback((evt) => {
    // const iframeElement = evt.target as HTMLIFrameElement;
    // if (iframeElement) {
    //   try {
    //     iframeElement.style.height = iframeElement.contentWindow?.document.body.scrollHeight + 'px';
    //   } catch (err) {
    //     console.warn("Iframe security error" + err);
    //   }
    // }
    onLoad?.();
  }, [onLoad]);

  return (
    <iframe
      className={styles.main}
      onLoad={onLoadedHandel}
      src={props.url}
    />
  );
}

registerRender(RenderTypes.HTML, HTMLRender);
