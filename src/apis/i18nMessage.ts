import { I18nMessage } from "../data/I18nMessage";
import { PagingParams, PagingResult } from "../data/Paging";
import curl from "../utils/curl"

type CreateOrUpdateParams = Partial<I18nMessage>

type ListParams = Partial<I18nMessage>

async function list(params: PagingParams<ListParams>) {
  params.orderByColumn = params.orderByColumn ?? 'createAt';
  params.descOrAsc = params.descOrAsc ?? 'desc';

  const response = await curl.get(`/api/poppy/v1/i18n-messages`, { params, });
  return response.data as PagingResult<I18nMessage>
}

async function create(params: CreateOrUpdateParams) {
  await curl.post(`/api/poppy/v1/i18n-messages`, params);
}

async function update(id: string, params: CreateOrUpdateParams) {
  await curl.put(`/api/poppy/v1/i18n-messages/${id}`, params);
}

async function get(id: string) {
  const response = await curl.get(`/api/poppy/v1/i18n-messages/${id}`);
  return response.data as I18nMessage
}

async function del(id: string) {
  await curl.delete(`/api/poppy/v1/i18n-messages/${id}`);
}

export default {
  list,
  create,
  get,
  update,
  del,
}
