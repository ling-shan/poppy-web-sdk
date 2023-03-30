import curl from "../utils/curl"
import storage from "../utils/storage";
import { Lang } from "../data/Lang";

async function getLangs()  {
  const appId = storage.getAppId();
  const response = await curl(`/api/poppy/v1/langs/bundles/${appId}`)
  return (response.data ?? []) as Lang[];
}

export default {
  getLangs
}
