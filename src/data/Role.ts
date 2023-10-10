// 0:normal 1:system admin 2:system default 3: system app default
export enum RoleType {
  Normal = 0,
  SystemAdmin = 1,
  SystemDefault = 2,
  SystemAppDefault = 3,
}

export interface Role {
  id: string
  appId: string
  status: number
  createAt: string
  updateAt: string

  level: number
  name: string
  remark: string
  parentId: string
  confidentialLevel: number
  roleType: number
}
