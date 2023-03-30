import { AuthData } from "../data/AuthData";
import curl from "../utils/curl"


export default {
  async getCurrent() {
    const { data } = await curl(`/api/poppy/v1/sessions/current`)
    return data as AuthData;
  },

  async create(authToken: string) {
    const { data } = await curl.post(`/api/poppy/v1/sessions/current`, {}, {
      headers: {
        "X-Auth-Token": authToken
      }
    })
    return data as AuthData
  }
}
