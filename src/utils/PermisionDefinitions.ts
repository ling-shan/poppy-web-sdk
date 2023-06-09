// permission key format
// 中杠命名法 Kebab Case: user-name-xxxx
// resouce.[field]:operation
// operation: c,r,u,d

export interface PermisionDefinition {
  Create: string
  Read: string,
  Write: string
  Delete: string,
}

function definePermision(resourceName: string) {
  return {
    Create: `${resourceName}:c`,
    Read: `${resourceName}:r`,
    Write: `${resourceName}:u`,
    Delete: `${resourceName}:d`,
  }
}

export default {
  App: definePermision('app'),
  Config: definePermision('config'),
  Domain: definePermision('domain'),
  I18nMessage: definePermision('i18nMessage'),
  Lang: definePermision('lang'),
  Menu: definePermision('menu'),
  OperationLog: definePermision('operationLog'),
  Role: definePermision('role'),
  Session: definePermision('sesion'),
  Style: definePermision('style'),
  User: definePermision('user'),
}
