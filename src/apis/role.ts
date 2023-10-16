import { Role } from "../data/Role";
import { PagingParams, PagingResult } from "../data/Paging";
import curl from "../utils/curl"

type CreateOrUpdateParams = Partial<Role>

type ListParams = Partial<Role>

async function list(params: PagingParams<ListParams>) {
  params.orderByColumn = params.orderByColumn ?? 'create_at';
  params.descOrAsc = params.descOrAsc ?? 'desc';

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
