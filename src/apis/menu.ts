
import curl from "../utils/curl"
import { Menu } from "../data/Menu";


async function getRouteMenuByPath(menuPath: string) {
  const { data } = await curl(`/api/poppy/v1/menus/route-menus/${menuPath}`)
  return data as Menu
}

export default {
  getRouteMenuByPath,
}
