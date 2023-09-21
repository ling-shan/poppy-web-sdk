import storageManager from "../utils/storageManager";
import { AuthData } from "../data/AuthData";
import curl from "../utils/curl"

async function authWithSession(userName: string, password: string) {
  const response = await curl.post(`/api/poppy/v1/authentication/session`, {
    appId: storageManager.getAppId(),
    userName,
    password
  })
  return response.data as AuthData;
}

async function authWithActiveCaptcha(userName: string) {
  const response = await curl.post(`/api/poppy/v1/authentication/active-captcha`, {
    appId: storageManager.getAppId(),
    userName,
  })
  return response.data as AuthData;
}

async function authWithCaptcha(authToken: string, captcha: string) {
  const response = await curl.post(`/api/poppy/v1/authentication/captcha`, {
    captcha,
  }, {
    headers: {
      "X-Auth-Token": authToken
    }
  })
  return response.data as AuthData;
}

async function authWithPassword(password: string) {
  const response = await curl.post(`/api/poppy/v1/authentication/password`, {
    password,
  })
  return response.data as AuthData;
}

export default {
  authWithSession,
  authWithActiveCaptcha,
  authWithCaptcha,
  authWithPassword,
}
