const KeyNames = {
  AppId: 'poppyAppId',
  AccessToken: 'poppyToken',
  Language: 'poppyLang',
  SupportedLanguages: 'poppySupportedLangs',
  LastVisitedMenuCode: 'lastVisitedMenuCode'
}

export interface StorageManager {
  get(key: string | null): string | null;
  set(key: string, value: string): void

  setAppId(value: string):void;
  getAppId(): string | null;

  setAccessToken(value: string | null):void
  getAccessToken(): string | null;

  setLanguage(value: string | null):void
  getLanguage(): string | null;

  setLastVisitedMenuCode(value: string):void;
  getLastVisitedMenuCode(): string | null;
}

class StorageManagerImpl implements StorageManager {
  private browserStorage = window.localStorage;

  set(key: string, value: string) {
    this.browserStorage.setItem(key, value);
  }

  get(key: string) {
    return this.browserStorage.getItem(key);
  }

  remove(key: string) {
    this.browserStorage.removeItem(key);
  }

  setAppId(value: string) {
    if (value == null) {
      this.browserStorage.removeItem(KeyNames.AppId);
    } else {
      this.browserStorage.setItem(KeyNames.AppId, value);
    }
  }

  getAppId() {
    return this.browserStorage.getItem(KeyNames.AppId);
  }

  setAccessToken(value: string | null) {
    if (value == null) {
      this.browserStorage.removeItem(KeyNames.AccessToken);
    } else {
      this.browserStorage.setItem(KeyNames.AccessToken, value);
    }
  }

  getAccessToken() {
    return this.browserStorage.getItem(KeyNames.AccessToken);
  }

  setLanguage(value: string | null) {
    if (value == null) {
      this.browserStorage.removeItem(KeyNames.Language);
    } else {
      this.browserStorage.setItem(KeyNames.Language, value);
    }
  }

  getLanguage() {
    return this.browserStorage.getItem(KeyNames.Language);
  }

  setSupportedLanguages(value: string) {
    if (value == null) {
      this.browserStorage.removeItem(KeyNames.SupportedLanguages);
      this.browserStorage.removeItem(KeyNames.Language);
    } else {
      this.browserStorage.setItem(KeyNames.SupportedLanguages, value);
      const lang = this.browserStorage.getItem(KeyNames.Language) ?? window.navigator.language;
      const langs = value.split(",");
      if (!lang || !langs.includes(lang)) {
        this.browserStorage.setItem(KeyNames.Language, langs[0] ?? 'zh-CN');
      }
    }
  }

  getSupportedLanguages() {
    return this.browserStorage.getItem(KeyNames.SupportedLanguages);
  }

  setLastVisitedMenuCode(value: string):void {
    this.browserStorage.setItem(KeyNames.LastVisitedMenuCode, value);
  }

  getLastVisitedMenuCode(): string | null {
    return this.browserStorage.getItem(KeyNames.LastVisitedMenuCode);
  }
}

export default new StorageManagerImpl()




