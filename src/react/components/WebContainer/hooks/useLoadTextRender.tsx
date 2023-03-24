import { useEffect, useState } from "react";
import { RenderComponentProps } from "../renderRegistory";

export function useLoadTextRender(props: RenderComponentProps) {
  const [content, setContent] = useState('');

  useEffect(() => {
    (async () => {
      props.onStart?.();
      try {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const responseResult = await fetch(props.url!, {
          headers: {
            "Cache-Control": "no-cache"
          }
        });
        const responseContent = await responseResult.text();
        setContent(responseContent ?? '');
        props.onLoad?.();
      } catch (err) {
        props.onError?.();
      }
    })();
  }, [props.url])

  return content;
}
