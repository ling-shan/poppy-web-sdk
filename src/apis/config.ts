import { PagingParams, PagingResult } from "../data/Paging";
import { Config } from "../data/Config";
import curl from "../utils/curl"

type CreateOrUpdateParams = Partial<Config>

type ListParams = Partial<Config>;

async function list(params: PagingParams<ListParams>) {
  params.orderByColumn = params.orderByColumn ?? 'createAt';
  params.descOrAsc = params.descOrAsc ?? 'desc';

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

async function getValue(key: string) {
  const response = await curl.get(`/api/poppy/v1/configs/current/${key}`);
  return response.data as string;
}

async function getValueByAppId(key: string, appId: string) {
  const response = await curl.get(`/api/poppy/v1/configs/${appId}/${key}`);
  return response.data as string;
}

export default {
  list,
  create,
  get,
  update,
  del,
  getValue,
  getValueByAppId,
}
