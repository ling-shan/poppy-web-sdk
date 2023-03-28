import { useEffect, useState } from "react";
import i18n from '../../utils/i18n';

/**
 * used for the i18n messages
 * @param key
 * @param map
 * @returns
 */
export function useFormatMessage(key: string, map?: Record<string, string>) {
  const [loaded, setLoaded] = useState(i18n.loaded);

  useEffect(() => {
    if (!loaded) {
      return;
    }

    i18n.load().then(() => {
      setLoaded(true);
    })
  })

  return i18n.formatMessage(key, map);
}
