
import { Webhook } from "data/Webhook";
import { PagingParams, PagingResult } from "../data/Paging";
import curl from "../utils/curl"

type CreateOrUpdateParams = Partial<Webhook>

type ListParams = Partial<Webhook>;

async function list(params: PagingParams<ListParams>) {
  params.orderByColumn = params.orderByColumn ?? 'create_at';
  params.descOrAsc = params.descOrAsc ?? 'desc';

  const response = await curl.get(`/api/poppy/v1/webhooks`, { params, });
  return response.data as PagingResult<Webhook>
}

async function create(params: CreateOrUpdateParams) {
  await curl.post(`/api/poppy/v1/webhooks`, params);
}

async function update(id: string, params: CreateOrUpdateParams) {
  await curl.put(`/api/poppy/v1/webhooks/${id}`, params);
}

async function get(id: string) {
  const response = await curl.get(`/api/poppy/v1/webhooks/${id}`);
  return response.data as Webhook
}

async function del(id: string) {
  await curl.delete(`/api/poppy/v1/webhooks/${id}`);
}

export default {
  list,
  create,
  get,
  update,
  del,
}
