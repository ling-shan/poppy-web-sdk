export interface Menu {
  id: string
  name: string
  menuCode: string
  parentId: string
  menuPath: string
  menuData: string
  menuDataType: string
  level: number
  confidentialLevel: number
  menuType: number
  linkUrl: string
  icon: string
  sort: number
  remark: string

  // 接口 不会给前端这边格式化的
  children: Menu[]

  // 格式化好的
  path: string
}
