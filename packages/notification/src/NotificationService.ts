import { service } from "@cpro-js/react-core";

import { ErrorDetail } from "./NotificationModel";
import { NotificationStore } from "./NotificationStore";

@service()
export class NotificationService {
  constructor(private store: NotificationStore) {}

  public showError = (
    message: string,
    details?: Error | ErrorDetail,
    callback?: () => void
  ) => {
    const detailMessage = details instanceof Error ? details.message : details;
    this.store.appendError({ message, details: detailMessage }, callback);
  };

  public showSuccess = (successMessage: string, callback?: () => void) => {
    this.store.appendSuccessMessage(successMessage, callback);
  };
}
