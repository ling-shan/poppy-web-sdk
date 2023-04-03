import { Role } from "../data/Role";
import { PagingParams, PagingResult } from "../data/Paging";
import curl from "../utils/curl"

interface CreateOrUpdateParams {
  name: string,
  confidentialLevel?: number,
  status?: number,
  remark?: string
}

interface ListParams {
  name?: string,
  status?: number
}

async function list(params: PagingParams<ListParams>) {
  const response = await curl.get(`/api/poppy/v1/roles`, { params, });
  return response.data as PagingResult<Role>
}

async function create(params: CreateOrUpdateParams) {
  await curl.post(`/api/poppy/v1/roles`, params);
}

async function update(id: string, params: CreateOrUpdateParams) {
  await curl.put(`/api/poppy/v1/roles/${id}`, params);
}

async function get(id: string) {
  const response = await curl.get(`/api/poppy/v1/roles/${id}`);
  return response.data as Role
}

async function del(id: string) {
  await curl.delete(`/api/poppy/v1/roles/${id}`);
}

export default {
  list,
  create,
  get,
  update,
  del,
}
