export interface CustomizedService {
  id: string
  appId: string
  status: number
  createAt: string
  updateAt: string

  name: string
  icon?: string

  intro?: string
  remark?: string

  category?: string
  serviceCode: string
  moduleCode?: string

  apiUrl: string
  timeout: number
  credentials?: Record<string, any>
  extendParameters?: Record<string, any>
  mockResponse?: Record<string, any>


}
