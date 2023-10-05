import { observer, useInjection } from "@cpro-js/react-core";
import { FC, ReactElement, ReactNode } from "react";

import { ErrorMessageBox } from "./component/ErrorMessageBox";
import { SuccessMessageToast } from "./component/SuccessMessageToast";
import { UserErrorModel } from "./NotificationModel";
import { NotificationStore } from "./NotificationStore";

export interface NotificationRendererProps {
  /**
   * Specifies how long success messages will stay on the screen before automatically disappearing.
   * Duration in milliseconds (default: 3000ms = 3sec).
   */
  successNotiDuration?: number;
  /**
   * Render your own success message.
   * Call the finishAction when you're done showing the message.
   *
   * @param message
   * @param duration
   * @param finishAction
   */
  renderSuccess?: (
    message: string,
    duration: number,
    finishAction: () => void
  ) => ReactElement;
  /**
   * Add your own renderer for error messages.
   * Call the finishAction when you're done showing the message.
   *
   * @param error containing the error message and maybe some more details
   * @param finishAction
   */
  renderError?: (
    error: UserErrorModel,
    finishAction: () => void
  ) => ReactElement;
}

const DEFAULT_DURATION = 3000;

export const NotificationRenderer: FC<NotificationRendererProps> = observer(
  (props) => {
    const { successNotiDuration, renderSuccess, renderError } = props;
    const notiStore = useInjection(NotificationStore);

    const [error, errorCallback] = notiStore.getNextError();
    const [successMessage, successCallback] = notiStore.getNextSuccessMessage();
    const successDuration =
      typeof successNotiDuration === "number"
        ? successNotiDuration
        : DEFAULT_DURATION;

    return (
      <>
        {successMessage && (
          <SuccessMessageToast
            message={successMessage}
            duration={successDuration}
            renderSuccess={renderSuccess}
            callback={successCallback}
          />
        )}

        {error && (
          <ErrorMessageBox
            key={error.message + Date.now()}
            error={error}
            renderError={renderError}
            callback={errorCallback}
          />
        )}
      </>
    );
  }
);
