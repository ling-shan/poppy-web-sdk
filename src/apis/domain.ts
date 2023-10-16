
import { Domain } from "../data/Domain";
import { PagingParams, PagingResult } from "../data/Paging";
import curl from "../utils/curl"

type CreateOrUpdateParams = Partial<Domain>

type ListParams = Partial<Domain>;

async function list(params: PagingParams<ListParams>) {
  params.orderByColumn = params.orderByColumn ?? 'create_at';
  params.descOrAsc = params.descOrAsc ?? 'desc';

  const response = await curl.get(`/api/poppy/v1/domains`, { params, });
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
