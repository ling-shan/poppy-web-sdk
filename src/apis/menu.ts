
import curl from "../utils/curl"
import { Menu } from "../data/Menu";

async function getRouteMenuByMenuCode(menuCode: string) {
  const { data } = await curl(`/api/poppy/v1/menus/route-menus/menuCode`, {
    params: {
      menuCode: decodeURIComponent(menuCode),
    }
  })
  return data as Menu
}

async function getRouteMenuPermissions(id: string) {
  const { data } = await curl(`/api/poppy/v1/menus/route-menus/${id}/permissions`);
  return data as Menu[]
}

async function getAllRouteMenus() {
  const { data } = await curl(`/api/poppy/v1/menus/route-menus`)
  return data as Menu[]
}

let getAllRouteMenusPromise: Promise<Menu[]>;

async function getAllRouteMenusWithCache() {
  if (getAllRouteMenusPromise) {
    return getAllRouteMenusPromise;
  }

  getAllRouteMenusPromise = getAllRouteMenus();

  return getAllRouteMenusPromise;
}

interface CreateOrUpdateParams {
  name: string,
  menuCode: string,
  parentId?: string,
  menuData?: string,
  confidentialLevel?: number,
  menuType: number,
  linkUrl?: string,
  icon?: string,
  sort?: 0,
  remark?: string,
  status?: 0
}

interface ListParams {
  name?: string,
  status?: number
}

// async function list(params: PagingParams<ListParams>) {
//   const response = await curl.get(`/api/poppy/v1/roles`, { params, });
//   return response.data as PagingResult<Role>
// }

async function create(params: CreateOrUpdateParams) {
  await curl.post(`/api/poppy/v1/roles`, params);
}

async function update(id: string, params: CreateOrUpdateParams) {
  await curl.put(`/api/poppy/v1/roles/${id}`, params);
}

async function get(id: string) {
  const response = await curl.get(`/api/poppy/v1/roles/${id}`);
  return response.data as Menu
}

async function del(id: string) {
  await curl.delete(`/api/poppy/v1/roles/${id}`);
}

export default {
  getRouteMenuByMenuCode,
  getAllRouteMenus,
  getAllRouteMenusWithCache,
  getRouteMenuPermissions,
  // list,
  create,
  get,
  update,
  del,
}
