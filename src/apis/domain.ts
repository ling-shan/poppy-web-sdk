import { Domain } from "../data/Domain";
import { PagingParams, PagingResult } from "../data/Paging";
import curl from "../utils/curl"

interface CreateOrUpdateParams {
  domain: string
  remark?: string
  status?: number
}

interface ListParams {
  domain?: string,
  status?: number
}

async function list(params: PagingParams<ListParams>) {
  const response = await curl.get(`/api/poppy/v1/langs`, { params, });
  return response.data as PagingResult<Domain>
}

async function create(params: CreateOrUpdateParams) {
  await curl.post(`/api/poppy/v1/domains`, params);
}

async function update(id: string, params: CreateOrUpdateParams) {
  await curl.put(`/api/poppy/v1/domains/${id}`, params);
}

async function get(id: string) {
  const response = await curl.get(`/api/poppy/v1/domains/${id}`);
  return response.data as Domain
}

async function del(id: string) {
  await curl.delete(`/api/poppy/v1/domains/${id}`);
}

export default {
  list,
  create,
  get,
  update,
  del,
}
