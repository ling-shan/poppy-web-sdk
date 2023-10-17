export interface AppInfo {
  id: string
  status: number
  createAt: string
  updateAt: string

  lookAndFeel: Record<string, any> | null
  domain: string
  name: string
  logoImg: string | null
  favicon: string | null
  defaultRoleId: string
  intro: string | null
  expireAt: string
  remark: string
  footer: string
  footerExt: Record<string, any> | null
  waterPrint: string | null
}
