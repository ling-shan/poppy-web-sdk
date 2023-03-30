import curl from "../utils/curl"
import { getClientDomain } from "../utils/domain"

import { AppInfo } from "../data/AppInfo";

async function getByDomain() {
  const response = await curl(`/api/poppy/v1/apps/domains/${encodeURIComponent(getClientDomain())}`)
  return response.data as AppInfo;
}

let getByDomainPromise: Promise<AppInfo>;

async function getByDomainWithCache() {
  getByDomainPromise = getByDomain();
  return getByDomainPromise;
}

export default {
  getByDomain,
  getByDomainWithCache
}
