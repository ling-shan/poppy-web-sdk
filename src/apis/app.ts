import curl from "../utils/curl"
import { getClientDomain } from "../utils/domain"

import { AppInfo } from "../data/AppInfo";
import { PagingParams, PagingResult } from "../data/Paging";

async function getByDomain() {
  const response = await curl(`/api/poppy/v1/apps/domains/${encodeURIComponent(getClientDomain())}`)

  const lookAndFeel = response.data.lookAndFeel ? JSON.parse(response.data.lookAndFeel) : null;
  response.data.lookAndFeel = lookAndFeel;

  const footerExt = response.data.footerExt ? JSON.parse(response.data.footerExt) : null;
  response.data.footerExt = footerExt;

  return response.data as AppInfo;
}

let getByDomainPromise: Promise<AppInfo>;

async function getByDomainWithCache() {
  if (getByDomainPromise) {
    return getByDomainPromise;
  }

  getByDomainPromise = getByDomain();
  return getByDomainPromise;
}

interface CreateOrUpdateParams {
  name: string,
  email: string,
  logoImg?: string,
  intro?: string,
  remark?: string,
  footer?: string,
  footerExt?: string,
  lookAndFeel?: string,
  status?: number,
}

interface ListParams {
  name?: string,
  status?: number
}

async function list(params: PagingParams<ListParams>) {
  const response = await curl.get(`/api/poppy/v1/apps`, { params, });
  return response.data as PagingResult<AppInfo>
}

async function create(params: CreateOrUpdateParams) {
  await curl.post(`/api/poppy/v1/apps`, params);
}

async function update(id: string, params: CreateOrUpdateParams) {
  await curl.put(`/api/poppy/v1/apps/${id}`, params);
}

async function get(id: string) {
  const response = await curl.get(`/api/poppy/v1/apps/${id}`);
  return response.data as AppInfo
}

async function getCurrent() {
  const response = await curl.get(`/api/poppy/v1/apps/current`);
  return response.data as AppInfo
}

async function del(id: string) {
  await curl.delete(`/api/poppy/v1/apps/${id}`);
}

export default {
  getByDomain,
  getByDomainWithCache,
  getCurrent,
  list,
  create,
  get,
  update,
  del,
}
