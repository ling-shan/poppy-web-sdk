import { useEffect, useState } from 'react';
import i18n, { I18nMessage, placeholderI18n } from '../../utils/i18n';

export function useI18nMessage(): I18nMessage {
  const [isLoaded, setIsLoaded] = useState(i18n.loaded);
  useEffect(() => {
    if (isLoaded) {
      return;
    }

    i18n.load().then(() => {
      setIsLoaded(true);
    })
  })

  return isLoaded ? i18n : placeholderI18n;
}
