export interface OperationLog {
  id: string
  appId: string
  createAt: string
  updateAt: string

  operator: string
  confidentialLevel: number
  actionName: string
  actionContent: string,

  requestUrl: string
  requestIp: string
  requestMethod: string
  requestParams: string
  requestUserAgent: string
  responseBody: string
  responseHttpCode: string
  requestResponseTime: number

  remark: string
}
