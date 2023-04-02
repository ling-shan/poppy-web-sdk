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

export default {
  authWithSession
}
