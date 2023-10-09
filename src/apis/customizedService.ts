import { CustomizedService } from "data/CustomizedService";
import curl from "../utils/curl"

import { PagingParams, PagingResult } from "data/Paging";

interface ListParams {
  name?: string,
  serviceCode?: string
  status?: number
}

async function list(params: PagingParams<ListParams>) {
  const response = await curl.get(`/api/poppy/v1/customized-services`, { params, });
  return response.data as PagingResult<CustomizedService>
}

async function create(params: Partial<CustomizedService>) {
  const data = {
    ...params,
    credentials: params.credentials ? JSON.stringify(params.credentials) : undefined,
    extendParameters: params.extendParameters ? JSON.stringify(params.extendParameters) : undefined,
    mockResponse: params.extendParameters ? JSON.stringify(params.mockResponse) : undefined,
  };
  await curl.post(`/api/poppy/v1/apps`, data);
}

async function update(id: string, params: Partial<CustomizedService>) {
  const data = {
    ...params,
    credentials: params.credentials ? JSON.stringify(params.credentials) : undefined,
    extendParameters: params.extendParameters ? JSON.stringify(params.extendParameters) : undefined,
    mockResponse: params.extendParameters ? JSON.stringify(params.mockResponse) : undefined,
  };
  await curl.put(`/api/poppy/v1/customized-services/${id}`, data);
}

async function get(id: string) {
  const response = await curl.get(`/api/poppy/v1/customized-services/${id}`);

  if (response.data.credentials) {
    try {
      response.data.credentials = JSON.parse(response.data.credentials);
    } catch(err) {
      response.data.credentials = null;
    }
  }

  if (response.data.extendParameters) {
    try {
      response.data.extendParameters = JSON.parse(response.data.extendParameters)
    } catch (err) {
      response.data.extendParameters = null;
    }
  }

  if (response.data.mockResponse) {
    try {
      response.data.mockResponse = JSON.parse(response.data.mockResponse)
    } catch (err) {
      response.data.mockResponse = null;
    }
  }

  return response.data as CustomizedService
}

async function del(id: string) {
  await curl.delete(`/api/poppy/v1/customized-services/${id}`);
}

export default {
  list,
  create,
  get,
  update,
  del,
}
