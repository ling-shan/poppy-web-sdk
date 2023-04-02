
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

export default {
  getRouteMenuByMenuCode,
  getAllRouteMenus,
  getRouteMenuPermissions,
}
