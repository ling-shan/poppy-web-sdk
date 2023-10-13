/* eslint-disable @typescript-eslint/no-explicit-any */
type DialogOpenner = (props?: Record<string, any>) => Promise<any | false>;

export interface DialogManager {
  openDialog<T = any>(name: string, props?: Record<string, any>): Promise<T | false>
  registerDialog(name: string, openner: DialogOpenner): void;
}

export const DialogNames = {
  CapchaAuth: "CapchaAuth",
  PasswordAuth: "PasswordAuth",
  TwoFactorAuth: "TwoFactorAuth",
  ResetPassword: "ResetPassword",
  ModifyPassword: "ModifyPassword",
};

class DialogManagerImpl implements DialogManager {

  private dialogOpenners: Record<string, DialogOpenner | null> = {};

  registerDialog(name: string, openner: DialogOpenner): void {
    if (this.dialogOpenners[name]) {
      return;
    }

    this.dialogOpenners[name] = openner;
  }

  async openDialog(name: string, props?: Record<string, any>): Promise<any | false> {
    const openner = this.dialogOpenners[name];
    if (!openner) {
      return false;
    }

    return openner(props);
  }
}

export const dialogManager: DialogManager = (window as any).$dialogManager ?? new DialogManagerImpl();

(window as any).$dialogManager = dialogManager;

export default dialogManager;



