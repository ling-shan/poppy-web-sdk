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
}
