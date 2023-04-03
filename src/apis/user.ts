import { User } from "../data/User";
import { PagingParams, PagingResult } from "../data/Paging";
import curl from "../utils/curl"

interface CreateOrUpdateParams {
  accountName: string
  phoneNo: string | null
  email: string
  headerImg: string | null,
  registerIp: string
}

interface ListParams {
  status?: number
  accountName?: string
  phoneNo?: string
  email?: string
}

async function list(params: PagingParams<ListParams>) {
  const response = await curl.get(`/api/poppy/v1/users`, { params, });
  return response.data as PagingResult<User>
}

async function create(params: CreateOrUpdateParams) {
  await curl.post(`/api/poppy/v1/users`, params);
}

async function update(id: string, params: CreateOrUpdateParams) {
  await curl.put(`/api/poppy/v1/users/${id}`, params);
}

async function get(id: string) {
  const response = await curl.get(`/api/poppy/v1/users/${id}`);
  return response.data as User
}

async function getCurrent() {
  const response = await curl.get(`/api/poppy/v1/users/current`);
  return response.data as User
}

async function del(id: string) {
  await curl.delete(`/api/poppy/v1/users/${id}`);
}

export default {
  getCurrent,
  list,
  create,
  get,
  update,
  del,
}
