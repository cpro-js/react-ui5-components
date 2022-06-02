import { service } from "@cpro-js/react-core";

import { ErrorDetail } from "./NotificationModel";
import { NotificationStore } from "./NotificationStore";

@service()
export class NotificationService {
  constructor(private store: NotificationStore) {}

  public showError = (message: string, details?: Error | ErrorDetail) => {
    this.store.appendError({
      message,
      details: details instanceof Error ? details.message : details,
    });
  };

  public showSuccess = (successMessage: string) => {
    this.store.appendSuccessMessage(successMessage);
  };
}
