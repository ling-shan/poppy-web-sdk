import curl from './curl'
import storage from './storage'

const Placeholder = '...'
const MessageReplaceReg = /\${\w+}/g

interface I18n {
  load(): Promise<void>
  readonly loaded: boolean
  formatMessage(key: string, map?: Record<string, string>): string
}

class I18nImpl implements I18n {
  private loadPromise: Promise<void> | null = null;
  private messages: Record<string, string> | null = null;

  loaded = false;

  constructor() {
    this.messages = (window as any).$i18nMessages ?? null;
    if (this.messages) {
      this.loaded = true;
    }
  }

  private async loadMessage() {
    const appId = storage.getAppId();
    if (!appId) {
      throw new Error("InvalidAppId");
    }
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

    if (this.loadPromise) {
      await this.loadPromise;
    }

    this.loadPromise = this.loadMessage();
  }

  formatMessage(key: string, map?: Record<string, string>): string {
    if (!this.messages) {
      return Placeholder;
    }

    const message = this.messages[key];
    if (!message) {
      return Placeholder;
    }

    if (!map) {
      return message;
    }

    return message.replace(MessageReplaceReg, (matcher) => {
      // ${retryLockExpireTime}
      const matcherKey = matcher.slice(2, -1);
      return map[matcherKey] ?? '';
    })
  }
}

const i18n = new I18nImpl();

export default i18n;
