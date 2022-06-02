import { useInjection } from "@cpro-js/react-core";
import { MessageBox, MessageBoxTypes } from "@ui5/webcomponents-react";
import { FC, useCallback, useState } from "react";
import { createPortal } from "react-dom";

import { UserErrorModel } from "../NotificationModel";
import { NotificationStore } from "../NotificationStore";

export interface ErrorMessageBoxProps {
  error: UserErrorModel;
}

export const ErrorMessageBox: FC<ErrorMessageBoxProps> = ({ error }) => {
  const notiStore = useInjection(NotificationStore);

  const [open, setOpen] = useState(true);

  const handleClose = useCallback(() => {
    notiStore.removeFromErrors(error);

    setOpen(false);
  }, [error]);

  return createPortal(
    <MessageBox
      open={open}
      actions={["Close"]}
      type={MessageBoxTypes.Error}
      onClose={handleClose}
    >
      {error.message}
    </MessageBox>,

    document.body
  );
};
