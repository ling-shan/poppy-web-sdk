import curl from './curl'
import storageManager from './storageManager'

const Placeholder = '...'
const MessageReplaceReg = /\${\w+}/g

export interface I18nMessage {
  formatMessage(key: string, params?: Record<string, string>): string
}

export interface I18n extends I18nMessage {
  load(): Promise<void>
  readonly loaded: boolean
}

export interface I18nParamters {
  key: string
  params?: Record<string, string>
}

class I18nImpl implements I18n {
  private loadPromise: Promise<void> | null = null;
  private messages: Record<string, string> | null = null;

  loaded = false;

  constructor() {
    this.messages = (window as any).$i18nMessages ?? null;
    if (!this.messages) {
      const i18nMessagesEle = document.getElementById("i18n-messages");
      if (i18nMessagesEle) {
        try {
          const messagesWithLocaleJson = JSON.parse(i18nMessagesEle.innerText);
          let findLang = navigator.languages.find((lang) => !!(messagesWithLocaleJson[lang]));
          if (!findLang) {
            findLang = Object.keys(messagesWithLocaleJson)[0];
          }
          if (findLang) {
            this.messages = messagesWithLocaleJson[findLang];
          }
        // eslint-disable-next-line no-empty
        } catch (err) {
        }
      }
    }

    if (this.messages) {
      this.loaded = true;
    }
  }

  private async loadMessage() {
    const appId = storageManager.getAppId() ?? '1';
    const responseData = await curl(`/api/poppy/v1/i18n-messages/bundles/${appId}`);
    this.messages = responseData.data ?? {};
    (window as any).$i18nMessages = this.messages;
    this.loadPromise = null;
    this.loaded = true;
  }

  async load() {
    if (this.messages) {
      return;
    }

    if (!this.loadPromise) {
      this.loadPromise = this.loadMessage();
    }

    await this.loadPromise;
  }

  formatMessage(key: string, params?: Record<string, string>): string {
    if (!this.messages) {
      return Placeholder;
    }

    if (!key) {
      return '';
    }

    let messageText = this.messages[key];
    if (messageText === undefined) {
      messageText = key;
    }

    if (!params) {
      return messageText;
    }

    return messageText.replace(MessageReplaceReg, (matcher) => {
      // ${retryLockExpireTime}
      const matcherKey = matcher.slice(2, -1);
      return params[matcherKey] ?? '';
    })
  }
}

const i18n = new I18nImpl();

export const placeholderI18n: I18nMessage = {
  formatMessage() {
    return Placeholder;
  }
}

export default i18n;
