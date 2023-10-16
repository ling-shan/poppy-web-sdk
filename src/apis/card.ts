import { PagingParams, PagingResult } from "data/Paging";
import { Card } from "data/Card";
import curl from "../utils/curl";

type ListParams = Partial<Card>;
type CreateOrUpdateParams = Partial<Card>

async function list(params: PagingParams<ListParams>) {
  params.orderByColumn = params.orderByColumn ?? 'create_at';
  params.descOrAsc = params.descOrAsc ?? 'desc';

  const response = await curl.get(`/api/poppy/v1/cards`, { params, });
  return response.data as PagingResult<Card>
}

async function create(params: CreateOrUpdateParams) {
  await curl.post(`/api/poppy/v1/cards`, params);
}

async function update(id: string, params: CreateOrUpdateParams) {
  await curl.put(`/api/poppy/v1/cards/${id}`, params);
}

async function get(id: string) {
  const response = await curl.get(`/api/poppy/v1/cards/${id}`);
  return response.data as Card
}

async function del(id: string) {
  await curl.delete(`/api/poppy/v1/cards/${id}`);
}

export default {
  list,
  create,
  get,
  update,
  del,
}
