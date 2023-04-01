
import curl from "../utils/curl"
import { Menu } from "../data/Menu";


async function getRouteMenuByPath(menuPath: string) {
  const { data } = await curl(`/api/poppy/v1/menus/route-menus/menuPath`, {
    params: {
      menuPath: encodeURIComponent(menuPath),
    }
  })
  return data as Menu
}

async function getAllRouteMenus() {
  const { data } = await curl(`/api/poppy/v1/menus/route-menus`)
  return data as Menu[]
}

export default {
  getRouteMenuByPath,
  getAllRouteMenus,
}
