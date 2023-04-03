import curl from "../utils/curl"
import storageManager from "../utils/storageManager";
import { Lang } from "../data/Lang";
import { PagingParams, PagingResult } from "../data/Paging";

async function getLangBundle()  {
  const appId = storageManager.getAppId();
  const response = await curl(`/api/poppy/v1/langs/bundles/${appId}`);
  return (response.data ?? []) as Lang[];
}

let getLangsPromise: Promise<Lang[]>;

async function getLangBundleWithCache() {
  getLangsPromise = getLangBundle();
  return getLangsPromise;
}

interface CreateOrUpdateParams {
  locale: string,
  name: string,
  remark?: string
}


interface CreateLangParams {
  locale: string,
  name: string,
  remark?: string
}

async function list(params: PagingParams) {
  const response = await curl.get(`/api/poppy/v1/langs`, { params, });
  return response.data as PagingResult<Lang>
}

async function create(params: CreateLangParams) {
  await curl.post(`/api/poppy/v1/langs`, params);
}

async function get(id: string) {
  const response = await curl.get(`/api/poppy/v1/langs/${id}`);
  return response.data as Lang
}

async function update(id: string, params: CreateOrUpdateParams) {
  await curl.put(`/api/poppy/v1/langs/${id}`, params);
}

async function del(id: string) {
  await curl.delete(`/api/poppy/v1/langs/${id}`);
}


export default {
  getLangBundle,
  getLangBundleWithCache,
  list,
  create,
  get,
  update,
  del,
}
