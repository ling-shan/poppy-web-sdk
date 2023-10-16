import { User } from "../data/User";
import { PagingParams, PagingResult } from "../data/Paging";
import curl from "../utils/curl"
import { Role } from "../data/Role";

type CreateOrUpdateParams = Partial<User>

type ListParams = Partial<User>

async function list(params: PagingParams<ListParams>) {
  params.orderByColumn = params.orderByColumn ?? 'create_at';
  params.descOrAsc = params.descOrAsc ?? 'desc';

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

async function getRolesByUserId(id: string) {
  const response = await curl.get(`/api/poppy/v1/users/${id}/roles`);
  return response.data as Role[];
}

async function updateRolesByUserId(id: string, roleIds: string[]) {
  const response = await curl.put(`/api/poppy/v1/users/${id}/roles`, {
    roleIds: roleIds ?? []
  });
  return response.data as Role[];
}

async function resetPassword(authToken: string, password: string) {
  await curl.post(`/api/poppy/v1/users/credentials/reset-password`, {
    password
  }, {
    headers: {
      "X-Auth-Token": authToken
    }
  });
}


async function updatePassword(authToken: string, password: string) {
  await curl.put(`/api/poppy/v1/users/credentials/password`, {
    password
  }, {
    headers: {
      "X-Auth-Token": authToken
    }
  });
}


export default {
  getCurrent,
  list,
  create,
  get,
  update,
  del,
  getRolesByUserId,
  updateRolesByUserId,
  resetPassword,
  updatePassword,
}
