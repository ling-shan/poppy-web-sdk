import curl from "../utils/curl"
import { getClientDomain } from "../utils/domain"

import { AppInfo } from "../data/AppInfo";

export async function getAppInfoByDomain()  {
  const response = await curl(`/api/poppy/v1/apps/domains/${encodeURIComponent(getClientDomain())}`)
  return response.data as AppInfo;
}
