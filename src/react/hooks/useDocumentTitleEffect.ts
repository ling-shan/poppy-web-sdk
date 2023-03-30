import { useEffect } from "react"
import i18n, { I18nParamters } from "../../utils/i18n";

export function useDocumentTitleEffect(title: string | I18nParamters | null) {
  useEffect(() => {
    if (!title) {
      return;
    }

    if (typeof title === 'string') {
      window.document.title = title;
      return;
    }

    if (typeof title === 'object') {
      i18n.load().then(() => {
        window.document.title = i18n.formatMessage(title.key, title.params)
      })
    }
  }, [title])
}
