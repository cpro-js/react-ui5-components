import { observer, useInjection } from "@cpro-js/react-core";
import { Toast, ToastDomRef, ToastPlacement } from "@ui5/webcomponents-react";
import { FC, useEffect, useRef } from "react";

import { NotificationStore } from "../NotificationStore";

export interface SuccessMessageToastProps {
  successMessages: Array<string>;
  duration: number;
}

export const SuccessMessageToast: FC<SuccessMessageToastProps> = observer(
  (props) => {
    const { successMessages, duration } = props;
    const notiStore = useInjection(NotificationStore);

    const ref = useRef<ToastDomRef>(null);

    const successMessage = successMessages[0];

    useEffect(() => {
      ref?.current?.show();

      setTimeout(() => {
        notiStore.removeFromSuccessMessages(successMessage);
      }, duration);
    }, [ref, successMessage]);

    return (
      <Toast
        duration={duration}
        placement={ToastPlacement.BottomCenter}
        ref={ref}
      >
        {successMessage}
      </Toast>
    );
  }
);
