/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios'

// storage key
const $$HTTP_SERVER_TOKEN = '$$HTTP_SERVER_TOKEN'
const $$I18N_LAN = 'i18nextLng'

export interface HttpServerApiResponse<T = any> {
  success: boolean
  messageKey: string
  messagePrams: Record<string, any>
  data: T
}

export const baseURL = process.env.REACT_APP_POPPY_API_PREFIX

const log = (config: InternalAxiosRequestConfig, ...args: any[]) => {
  const { url = '', baseURL = '', method } = config
  console.log(
    `${url?.startsWith(`http`) ? url : baseURL + url}`,
    `[${method}]`,
    ...args,
  )
}

const instance = axios.create({
  baseURL,
  timeout: 60 * 1000,
  responseType: 'json',
  headers: {},
})

// 请求拦截器 设置公共参数
instance.interceptors.request.use(
  async (config) => {
    const { data, params } = config

    // 设置 token
    const token = await getToken()
    if (token) {
      Object.assign(config.headers, {
        Authorization: `Bearer ${token}`,
      })
    }

    // 设置语言
    const lang = window.localStorage.getItem($$I18N_LAN)
    config.headers = Object.assign(
      {
        'X-Language': lang,
      },
      config.headers,
    )

    log(config, `请求参数 =>`, data || params)

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 响应拦截器
instance.interceptors.response.use(
  (response) => {
    const { data: respData, config, headers } = response
    log(config, '请求结果 => ', respData)

    const { success, data } = respData as HttpServerApiResponse
    if (!success) {
      return Promise.reject(respData)
    }

    setupToken(headers)

    return data
  },
  (error) => {
    log(error.config, '请求错误 => ', error)

    const response: AxiosResponse = error.response
    if (response) {
      setupToken(response?.headers)
    }

    // 触发事件
    dispatchHttpServerErrorEvent(error)

    return Promise.reject(error)
  },
)

export default function curl<T = any>(
  url: string,
  data: Record<string, any> = {},
  options: AxiosRequestConfig = {},
): Promise<T> {
  const { method = 'get' } = options

  // url path 参数
  if (url.includes('{')) {
    data = { ...data }
    Object.keys(data).forEach((key) => {
      if (url.includes(`{${key}}`)) {
        url = url.replace(`{${key}}`, data[key])
        delete data[key]
      }
    })
  }
  options.url = url

  options[method === 'get' ? 'params' : 'data'] = data

  return instance(options)
}

// ---- token ----
const isIframe = window.top !== window
const httpServerGetToken = 'http server get token'
const httpServerClearToken = 'http server clear token'

// set token
function setupToken(headers: AxiosResponse['headers']) {
  if (!headers) {
    return
  }
  const token = headers['x-set-access-token']
  if (typeof token !== 'undefined') {
    if (token) {
      window.localStorage.setItem($$HTTP_SERVER_TOKEN, token)
    } else {
      if (isIframe) {
        window.parent.postMessage({ type: httpServerClearToken }, '*')
      } else {
        window.localStorage.removeItem($$HTTP_SERVER_TOKEN)
      }
    }
  }
}

// get token
const getToken = (() => {
  const context: {
    resolve?: (token: string) => void
    reject?: (err: any) => void
  } = {}

  // self
  window.addEventListener('message', (event) => {
    const { data } = event

    // get token
    if (data.type === httpServerGetToken) {
      if (isIframe) {
        // iframe
        context.resolve?.(data.detail)
        return
      }

      // self
      window.frames[0].postMessage(
        {
          type: httpServerGetToken,
          detail: window.localStorage.getItem($$HTTP_SERVER_TOKEN),
        },
        '*',
      )
      return
    }

    // clear token
    if (data.type === httpServerClearToken) {
      if (!isIframe) {
        window.localStorage.removeItem($$HTTP_SERVER_TOKEN)
      }
    }
  })

  return () => {
    // self
    if (!isIframe) {
      return window.localStorage.getItem($$HTTP_SERVER_TOKEN)
    }

    // iframe
    return new Promise((resolve, reject) => {
      context.resolve = resolve
      context.reject = reject
      window.parent.postMessage({ type: httpServerGetToken }, '*')
    })
  }
})()

// ---- 事件 ----
const httpServerError = 'http server error'

// 触发事件
export function dispatchHttpServerErrorEvent(error: unknown) {
  if (isIframe) {
    // current iframe
    window.postMessage({ type: httpServerError, detail: error }, '*')
    return
  }

  // self
  const event = new CustomEvent(httpServerError, {
    detail: error,
  })
  window.dispatchEvent(event)
}

// 监听事件
export function monitorHttpServerErrorEvent(listener: (event: any) => void) {
  window.addEventListener(httpServerError, listener)

  const handler = (event: MessageEvent<any>) => {
    const { data } = event
    if (data.type === httpServerError) {
      listener(data.detail)
    }
  }
  window.addEventListener('message', handler)

  return () => {
    window.removeEventListener(httpServerError, listener)
    window.removeEventListener('message', handler)
  }
}
