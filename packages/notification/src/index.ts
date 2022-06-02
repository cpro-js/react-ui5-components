import { AsyncModuleRegistry } from "@cpro-js/react-core";

import { NotificationStore } from "../dist";
import { NotificationService } from "./NotificationService";

export { NotificationRenderer } from "./NotificationRenderer";
export { NotificationService };

export const createNotificationRegistry: AsyncModuleRegistry = async (
  container
) => {
  container.bindSingleton(NotificationStore);
  container.bindSingleton(NotificationService);
};
