export interface User {
  id: string
  appId: string
  status: number
  createAt: string
  updateAt: string

  accountName: string
  phoneNo: string | null
  email: string
  headerImg: string | null,
  registerIp: string
}
