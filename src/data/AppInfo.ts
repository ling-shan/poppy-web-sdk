export interface AppInfo {
  id: string
  status: number
  createAt: string
  updateAt: string

  lookAndFeel: Record<string, any> | null
  domain: string
  name: string
  logoImg: string
  defaultRoleId: string
  intro: string
  expireAt: string
  remark: string
  footer: string
  footerExt: Record<string, any> | null
}
