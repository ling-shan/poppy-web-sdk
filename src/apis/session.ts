import { AuthData } from "../data/AuthData";
import curl from "../utils/curl"


async function getCurrent() {
  const { data } = await curl(`/api/poppy/v1/sessions/current`)
  return data as AuthData;
}

async function create(authToken: string) {
  const { data } = await curl.post(`/api/poppy/v1/sessions`, {}, {
    headers: {
      "X-Auth-Token": authToken
    }
  })
  return data as AuthData
}

export default {
  getCurrent,
  create
}
