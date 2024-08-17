export interface WebhookLog {
  id: string
  appId: string
  requestUrl: string
  requestParams: string
  eventMethod: string
  eventResource: string
  requestBody: string
  responseHttpCode: string
  requestResponseTime: number
  remark: string
}
