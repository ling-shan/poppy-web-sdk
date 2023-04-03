import { AuthData } from "../data/AuthData";
import curl from "../utils/curl"
import storageManager from "../utils/storageManager";

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

async function del(authToken: string) {
  await curl.delete(`/api/poppy/v1/sessions/${authToken}`);
}

async function deleleCurrent() {
  const authToken = storageManager.getAccessToken();
  if (!authToken) {
    throw new Error("InvalidToken");
  }
  await curl.delete(`/api/poppy/v1/sessions/${authToken}`);
  storageManager.setAccessToken(null);
}

async function getAll() {
  const { data } = await curl(`/api/poppy/v1/sessions`);
  return (data ?? []) as AuthData[]
}

export default {
  getCurrent,
  deleleCurrent,
  create,
  del,
  getAll,
}
