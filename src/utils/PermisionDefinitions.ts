// permission key format
// 中杠命名法 Kebab Case: user-name-xxxx
// resouce.[field]:operation
// operation: c,r,u,d

import webhookLog from "apis/webhookLog";

export interface PermisionDefinition {
  Create: string
  Read: string,
  Write: string
  Delete: string,
}

export function definePermision(resourceName: string) {
  return {
    Create: `${resourceName}:c`,
    Read: `${resourceName}:r`,
    Write: `${resourceName}:u`,
    Delete: `${resourceName}:d`,

    custom(flag: string) {
      return `${resourceName}:${flag}`;
    }
  }
}

export default {
  App: definePermision('app'),
  Config: definePermision('config'),
  Card: definePermision('card'),
  Domain: definePermision('domain'),
  I18nMessage: definePermision('i18nMessage'),
  Lang: definePermision('lang'),
  Menu: definePermision('menu'),
  OperationLog: definePermision('operationLog'),
  Role: definePermision('role'),
  Session: definePermision('session'),
  Style: definePermision('style'),
  User: definePermision('user'),
  CustomizedService: definePermision('customizedService'),
  Webhook: definePermision('webhook'),
  WebhookLog: definePermision('webhookLog'),
}
