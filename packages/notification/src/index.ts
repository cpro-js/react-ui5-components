import { AsyncModuleRegistry } from "@cpro-js/react-core";

import { NotificationService } from "./NotificationService";
import { NotificationStore } from "./NotificationStore";

export { NotificationRenderer } from "./NotificationRenderer";
export { NotificationService };

export const createNotificationRegistry: AsyncModuleRegistry = async (
  container
) => {
  container.bindSingleton(NotificationStore);
  container.bindSingleton(NotificationService);
};
