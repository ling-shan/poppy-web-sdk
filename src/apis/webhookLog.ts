
import { WebhookLog } from "data/WebhookLog";
import { PagingParams, PagingResult } from "../data/Paging";
import curl from "../utils/curl"

type CreateOrUpdateParams = Partial<WebhookLog>

type ListParams = Partial<WebhookLog>;

async function list(params: PagingParams<ListParams>) {
  params.orderByColumn = params.orderByColumn ?? 'create_at';
  params.descOrAsc = params.descOrAsc ?? 'desc';

  const response = await curl.get(`/api/poppy/v1/webhook-logs`, { params, });
  return response.data as PagingResult<WebhookLog>
}

async function create(params: CreateOrUpdateParams) {
  await curl.post(`/api/poppy/v1/webhook-logs`, params);
}

async function update(id: string, params: CreateOrUpdateParams) {
  await curl.put(`/api/poppy/v1/webhook-logs/${id}`, params);
}

async function get(id: string) {
  const response = await curl.get(`/api/poppy/v1/webhook-logs/${id}`);
  return response.data as WebhookLog
}

async function del(id: string) {
  await curl.delete(`/api/poppy/v1/webhook-logs/${id}`);
}

export default {
  list,
  create,
  get,
  update,
  del,
}
