import React, { useCallback, useEffect } from 'react';

import { RenderComponentProps, RenderTypes, registerRender } from '../../renderRegistory';

import styles from "./HTMLRender.module.css";

function HTMLRender(props: RenderComponentProps) {

  useEffect(() => {
    props.onStart?.();
  }, [props.url]);

  return (
    <iframe
      className={styles.main}
      onLoad={props.onLoad}
      src={props.url}
    />
  );
}

registerRender(RenderTypes.HTML, HTMLRender);
