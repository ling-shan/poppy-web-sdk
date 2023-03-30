import curl from "../utils/curl"
import { getClientDomain } from "../utils/domain"

import { AppInfo } from "../data/AppInfo";

async function getByDomain()  {
  const response = await curl(`/api/poppy/v1/apps/domains/${encodeURIComponent(getClientDomain())}`)
  return response.data as AppInfo;
}

export default {
  getByDomain
}
