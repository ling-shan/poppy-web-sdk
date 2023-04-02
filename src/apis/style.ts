import { StyleBundle } from "../data/Style";
import curl from "../utils/curl"
import storageManager from "../utils/storageManager";

async function getStyleBundle() {
  const appId = storageManager.getAppId();
  const response = await curl(`/api/poppy/v1/styles/bundles/${appId}`)
  return (response.data ?? {}) as StyleBundle;
}

export default {
  getStyleBundle,
}
