import { PagingParams, PagingResult } from "../data/Paging";
import { Config } from "../data/Config";
import curl from "../utils/curl"

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
  const response = await curl.get(`/api/poppy/v1/configs`, { params, });
  return response.data as PagingResult<Config>
}

async function create(params: CreateOrUpdateParams) {
  await curl.post(`/api/poppy/v1/configs`, params);
}

async function update(id: string, params: CreateOrUpdateParams) {
  await curl.put(`/api/poppy/v1/configs/${id}`, params);
}

async function get(id: string) {
  const response = await curl.get(`/api/poppy/v1/configs/${id}`);
  return response.data as Config
}

async function del(id: string) {
  await curl.delete(`/api/poppy/v1/configs/${id}`);
}

export default {
  list,
  create,
  get,
  update,
  del,
}
