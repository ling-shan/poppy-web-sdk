import { PermissionsData } from "../utils/permissionManager"

export interface Menu {
  id: string
  appId: string
  status: number
  createAt: string
  updateAt: string

  name: string
  menuCode: string
  parentId: string
  position:  number
  level: number
  confidentialLevel: number
  menuType: number
  linkUrl: string
  icon: string
  sort: number
  isPerm: number
  remark: string
  isExternalResource: number
  resourceParams: string
}

// 菜单状态
export enum MenuType {
  Menu = 0,
  Page = 1,
  Button = 2
}

export enum MenuPosition {
  Side = 0,
  Avatar = 1,
}

function findChildrnMenusByParentId(menus: Menu[], parentId: string, ) {
  if (!Array.isArray(menus)) {
    return [];
  }
  return menus.filter((menu) => {
    return menu.parentId === parentId;
  })
}

export interface TreeItem {
  children: TreeItem[]
  [key: string]: any
}

type TreeItemTransformer = (item: Menu & TreeItem) => TreeItem;

export function convertMenusToTreeItem(menus: Menu[], parentId?: string, transformer?: TreeItemTransformer): TreeItem[] {
  if (!Array.isArray(menus)) {
    return [];
  }

  const targetMenus = findChildrnMenusByParentId(menus, parentId ?? "0");
  const targetRouteMenus: TreeItem[] = targetMenus.map(targetMenu => {
    const treeItem = {
      ...targetMenu,
      children: convertMenusToTreeItem(menus, targetMenu.id, transformer)
    };

    if (transformer) {
      return transformer(treeItem);
    }

    return treeItem;
  })

  return targetRouteMenus.sort((a, b) => {
    return b.sort - a.sort;
  });
}

export function convertMenusToPermissions(menus: Menu[]): PermissionsData {
  if (!Array.isArray(menus)) {
    return {};
  }

  const permissions:PermissionsData = {};
  menus.forEach((menu) => {
    permissions[menu.menuCode] = true;
  })

  return permissions;
}
