import { I18nService, useInjection } from "@cpro-js/react-core";
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
  const { translate } = useInjection(I18nService);

  const [open, setOpen] = useState(true);
  const [expandDetails, setExpandDetails] = useState(false);

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

      {error.details && (
        <div style={{ marginTop: "2rem" }}>
          <a
            href="javascript:;"
            onClick={() => setExpandDetails(!expandDetails)}
          >
            {translate("general.showDetails")}
          </a>
          {expandDetails && (
            <div style={{ marginTop: "2rem" }}>{error.details}</div>
          )}
        </div>
      )}
    </MessageBox>,

    document.body
  );
};
