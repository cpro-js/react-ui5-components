import { observer, useInjection } from "@cpro-js/react-core";
import { Toast, ToastDomRef } from "@ui5/webcomponents-react";
import ToastPlacement from "@ui5/webcomponents/dist/types/ToastPlacement";
import { FC, ReactElement, useCallback, useEffect, useRef } from "react";

import { NotificationStore } from "../NotificationStore";

export interface SuccessMessageToastProps {
  message: string;
  duration: number;
  renderSuccess?: (
    message: string,
    duration: number,
    finishAction: () => void
  ) => ReactElement;
  callback?: () => void;
}

export const SuccessMessageToast: FC<SuccessMessageToastProps> = observer(
  (props) => {
    const { message, duration, renderSuccess, callback } = props;
    const notiStore = useInjection(NotificationStore);

    const onFinish = useCallback(() => {
      notiStore.removeFromSuccessMessages(message);
      if (callback) {
        callback();
      }
    }, [message, callback]);

    useEffect(() => {
      if (!renderSuccess) {
        setTimeout(onFinish, duration);
      }
    }, [duration, renderSuccess, onFinish]);

    if (renderSuccess) {
      return renderSuccess(message, duration, onFinish);
    }

    return (
      <Toast
        open={true}
        placement={ToastPlacement.BottomCenter}
        duration={duration}
      >
        {message}
      </Toast>
    );
  }
);
