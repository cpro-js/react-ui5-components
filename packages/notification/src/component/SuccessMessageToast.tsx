import { observer, useInjection } from "@cpro-js/react-core";
import { Toast, ToastDomRef, ToastPlacement } from "@ui5/webcomponents-react";
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

    const ref = useRef<ToastDomRef>(null);

    const onFinish = useCallback(() => {
      notiStore.removeFromSuccessMessages(message);
      if (callback) {
        callback();
      }
    }, [message, callback]);

    useEffect(() => {
      if (!renderSuccess) {
        ref?.current?.show();
        setTimeout(() => onFinish, duration);
      }
    }, [message, duration, renderSuccess]);

    if (renderSuccess) {
      return renderSuccess(message, duration, onFinish);
    }

    return (
      <Toast
        duration={duration}
        placement={ToastPlacement.BottomCenter}
        ref={ref}
      >
        {message}
      </Toast>
    );
  }
);
