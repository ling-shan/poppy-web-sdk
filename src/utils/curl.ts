/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, {
  AxiosError,
} from 'axios'

import storage from './storage';
import errorHandling from './errorHandling';

export interface HttpServerApiResponse<T = any> {
  success: boolean
  messageKey: string
  messagePrams: Record<string, any>
  data: T
}

export const baseURL = process.env.REACT_APP_POPPY_API_PREFIX ??
  (window as any).POPPY_API_PREFIX ??
  "http://poppy-api.lingyuan-tech.com/"

// const log = (config: InternalAxiosRequestConfig, ...args: any[]) => {
//   const { url = '', baseURL = '', method } = config
//   console.log(
//     `${url?.startsWith(`http`) ? url : baseURL + url}`,
//     `[${method}]`,
//     ...args,
//   )
// }

const instance = axios.create({
  baseURL,
  timeout: 60 * 1000,
  responseType: 'json',
})

// 请求拦截器 设置公共参数
instance.interceptors.request.use(
  async (config) => {
    // 设置 token
    const accessToken = storage.getAccessToken()
    if (accessToken) {
      config.headers["Authorization"] =  `Bearer ${accessToken}`;
    }

    // 设置语言
    const lang = storage.getLanguage();
    if (lang) {
      config.headers['X-Language'] = lang;
    }
    // log(config, `请求参数 =>`, data || params)
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    const { data: respData, headers } = response
    // log(config, '请求结果 => ', respData)
    const { success } = respData as HttpServerApiResponse
    if (!success) {
      return Promise.reject(respData)
    }

    // update app id
    const appId = headers['x-set-app-id'];
    if (appId !== undefined) {
      storage.setAppId(appId);
    }

    const supportedLangs = headers['x-set-supported-langs'];
    if (supportedLangs !== undefined) {
      storage.setSupportedLanguages(supportedLangs);
    }

    // update access token
    const assesToken = headers['x-set-access-token'];
    if (assesToken !== undefined) {
      storage.setAccessToken(assesToken ?? null);
    }

    return response
  },
  (error: AxiosError) => {
    // log(error.config, '请求错误 => ', error)
    // 触发事件
    // dispatchHttpServerErrorEvent(error)
    // we only care about the 401 error for the gloal
    if (error.response?.status === 401) {
      const invalidAccessTokenError = new Error('InvalidAccessToken');
      errorHandling.handleError(invalidAccessTokenError);
    }

    return Promise.reject(error)
  },
)

export default instance;
