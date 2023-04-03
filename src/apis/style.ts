import { PagingParams, PagingResult } from "../data/Paging";
import { Style, StyleBundle } from "../data/Style";
import curl from "../utils/curl"
import storageManager from "../utils/storageManager";

async function getStyleBundle() {
  const appId = storageManager.getAppId();
  const response = await curl(`/api/poppy/v1/styles/bundles/${appId}`)
  return (response.data ?? {}) as StyleBundle;
}

interface CreateOrUpdateParams {
  key: number,
  value: number,
  remark?: string
}

interface ListParams {
  key?: string,
  value?: string
}

async function list(params: PagingParams<ListParams>) {
  const response = await curl.get(`/api/poppy/v1/styles`, { params, });
  return response.data as PagingResult<Style>
}

async function create(params: CreateOrUpdateParams) {
  await curl.post(`/api/poppy/v1/styles`, params);
}

async function update(id: string, params: CreateOrUpdateParams) {
  await curl.put(`/api/poppy/v1/styles/${id}`, params);
}

async function get(id: string) {
  const response = await curl.get(`/api/poppy/v1/styles/${id}`);
  return response.data as Style
}

async function del(id: string) {
  await curl.delete(`/api/poppy/v1/styles/${id}`);
}

export default {
  getStyleBundle,
  list,
  create,
  get,
  update,
  del,
}
