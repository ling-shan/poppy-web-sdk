import { OperationLog } from "../data/OperationLog";
import { PagingParams, PagingResult } from "../data/Paging";
import curl from "../utils/curl";

type ListParams = Partial<OperationLog>

async function list(params: PagingParams<ListParams>) {
  params.orderByColumn = params.orderByColumn ?? 'createAt';
  params.descOrAsc = params.descOrAsc ?? 'desc';

  const response = await curl.get(`/api/poppy/v1/operation-logs`, { params, });
  return response.data as PagingResult<OperationLog>
}

// async function create(params: CreateOrUpdateParams) {
//   await curl.post(`/api/poppy/v1/roles`, params);
// }

// async function update(id: string, params: CreateOrUpdateParams) {
//   await curl.put(`/api/poppy/v1/roles/${id}`, params);
// }

// async function get(id: string) {
//   const response = await curl.get(`/api/poppy/v1/roles/${id}`);
//   return response.data as Role
// }

// async function del(id: string) {
//   await curl.delete(`/api/poppy/v1/roles/${id}`);
// }

export default {
  list,
}
