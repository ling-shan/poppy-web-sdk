/* eslint-disable @typescript-eslint/no-explicit-any */

import appENV from "./appEnv";

export type PermissionsData = Record<string, any>;

interface PermissionManager {
  setPermissions(permissions: PermissionsData): void
  pushPermissions(permissions: PermissionsData): void
  popPermissions(): PermissionsData | undefined
  hasPermission(key: string): boolean;
}

class PermissionManagerImpl implements PermissionManager {
  private mergedPermisions: PermissionsData;
  private permisionsStack: PermissionsData[];

  constructor() {
    this.mergedPermisions = {};
    this.permisionsStack = [];
  }

  private updateMergedPermisions() {
    const mergedPermisions = {};
    this.permisionsStack.forEach(permisionsItem => {
      Object.assign(mergedPermisions, permisionsItem);
    })
    this.mergedPermisions = mergedPermisions;
  }

  setPermissions(permissions: PermissionsData): void {
    this.permisionsStack = [];
    this.mergedPermisions = {};
    Object.assign(this.mergedPermisions, permissions);
  }

  pushPermissions(permissions: PermissionsData): void {
    if (!permissions) {
      permissions = {};
    }

    this.permisionsStack.push(permissions);
    this.updateMergedPermisions();
  }

  popPermissions(): PermissionsData | undefined {
    if (this.permisionsStack.length <= 0) {
      return undefined;
    }

    const permisions = this.permisionsStack.pop();
    if (!permisions) {
      return undefined;
    }

    this.updateMergedPermisions();
    return permisions;
  }

  hasPermission(key: string): boolean {
    if (appENV.dev && appENV.debug) {
      return true;
    }

    return !!this.mergedPermisions[key];
  }
}

export const permissionManager = new PermissionManagerImpl();

export default permissionManager;
