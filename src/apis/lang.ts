import curl from "../utils/curl"
import storageManager from "../utils/storageManager";
import { Lang } from "../data/Lang";

async function getLangBundle()  {
  const appId = storageManager.getAppId();
  const response = await curl(`/api/poppy/v1/langs/bundles/${appId}`)
  return (response.data ?? []) as Lang[];
}

let getLangsPromise: Promise<Lang[]>;

async function getLangBundleWithCache() {
  getLangsPromise = getLangBundle();
  return getLangsPromise;
}

export default {
  getLangBundle,
  getLangBundleWithCache
}
