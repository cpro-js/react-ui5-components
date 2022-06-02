import { observer, useInjection } from "@cpro-js/react-core";
import { FC } from "react";

import { ErrorMessageBox } from "./component/ErrorMessageBox";
import { SuccessMessageToast } from "./component/SuccessMessageToast";
import { NotificationStore } from "./NotificationStore";

export interface NotificationRendererProps {
  /**
   * Specifies how long success messages will stay on the screen before automatically disappearing.
   * Duration in milliseconds (default: 3000ms = 3sec).
   */
  successNotiDuration?: number;
}

const DEFAULT_DURATION = 3000;

export const NotificationRenderer: FC<NotificationRendererProps> = observer(
  (props) => {
    const { successNotiDuration } = props;
    const notiStore = useInjection(NotificationStore);

    const error = notiStore.getNextError();
    const successMessages = notiStore.getSuccessMessages();
    const successDuration =
      typeof successNotiDuration === "number"
        ? successNotiDuration
        : DEFAULT_DURATION;

    return (
      <>
        {successMessages.length > 0 && (
          <SuccessMessageToast
            successMessages={successMessages}
            duration={successDuration}
          />
        )}

        {error && (
          <ErrorMessageBox key={error.message + Date.now()} error={error} />
        )}
      </>
    );
  }
);
