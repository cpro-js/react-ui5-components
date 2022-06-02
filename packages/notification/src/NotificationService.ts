import { service } from "@cpro-js/react-core";

import type { UserErrorModel } from "./NotificationModel";
import { NotificationStore } from "./NotificationStore";

@service()
export class NotificationService {
  constructor(private store: NotificationStore) {}

  public showError(error: UserErrorModel) {
    this.store.appendError(error);
  }

  public showSuccess(successMessage: string) {
    this.store.appendSuccessMessage(successMessage);
  }

  public getNextError = () => this.store.getNextError();

  public getSuccessMessages = () => this.store.getSuccessMessages();
}
