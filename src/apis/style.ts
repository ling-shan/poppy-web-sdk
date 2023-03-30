import { StyleBundle } from "../data/Style";
import curl from "../utils/curl"
import storage from "../utils/storage";

async function getStyleBundle() {
  const appId = storage.getAppId();
  const response = await curl(`/api/poppy/v1/styles/bundles/${appId}`)
  return (response.data ?? {}) as StyleBundle;
}

export default {
  getStyleBundle,
}
