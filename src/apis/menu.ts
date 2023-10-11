
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

type CreateOrUpdateParams = Partial<Menu>
type ListParams = Partial<Menu>


async function create(params: CreateOrUpdateParams) {
  await curl.post(`/api/poppy/v1/menus`, params);
}

async function update(id: string, params: CreateOrUpdateParams) {
  await curl.put(`/api/poppy/v1/menus/${id}`, params);
}

async function get(id: string) {
  const response = await curl.get(`/api/poppy/v1/menus/${id}`);
  return response.data as Menu
}

async function list(params: ListParams) {
  const response = await curl.get(`/api/poppy/v1/menus`, { params });
  return response.data as Menu[]
}

async function getMenusByParentId(parentId: string) {
  const response = await curl.get(`/api/poppy/v1/menus/parent/${parentId}`);
  return response.data as Menu[]
}

async function getMenusByRoleId(roleId: string) {
  const response = await curl.get(`/api/poppy/v1/menus/roles/${roleId}`);
  return response.data as Menu[]
}

// interface RoleMenuPermissions {
//   menuId: string[]
//   operate?: ("cancel" | "empower")[]
// }

async function updateMenusPermissionsByRoleId(roleId: string, menuIds: string[]) {
  await curl.put(`/api/poppy/v1/menus/roles/${roleId}/permissions`, {
    menuIds,
  });
}

async function getMenusPermissionsByRoleId(roleId: string) {
  const response = await curl.get(`/api/poppy/v1/menus/roles/${roleId}/permissions`);
  return response.data as Menu[]
}

async function del(id: string) {
  await curl.delete(`/api/poppy/v1/menus/${id}`);
}

export default {
  getRouteMenuByMenuCode,
  getAllRouteMenus,
  getAllRouteMenusWithCache,
  getRouteMenuPermissions,
  create,
  get,
  update,
  del,
  list,
  getMenusByParentId,
  getMenusByRoleId,
  getMenusPermissionsByRoleId,
  updateMenusPermissionsByRoleId,
}
