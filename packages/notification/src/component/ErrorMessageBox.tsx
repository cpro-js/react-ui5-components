import { I18nService, useInjection } from "@cpro-js/react-core";
import {
  Link,
  LinkDomRef,
  MessageBox,
  Ui5CustomEvent,
} from "@ui5/webcomponents-react";
import { FC, ReactElement, useCallback, useState } from "react";
import { createPortal } from "react-dom";

import { UserErrorModel } from "../NotificationModel";
import { NotificationStore } from "../NotificationStore";

export interface ErrorMessageBoxProps {
  error: UserErrorModel;
  renderError?: (
    error: UserErrorModel,
    closeAction: () => void
  ) => ReactElement;
  callback?: () => void;
}

export const ErrorMessageBox: FC<ErrorMessageBoxProps> = (props) => {
  const { error, renderError, callback } = props;
  const notiStore = useInjection(NotificationStore);
  const { translate } = useInjection(I18nService);

  const [open, setOpen] = useState(true);
  const [expandDetails, setExpandDetails] = useState(false);

  const handleClose = useCallback(() => {
    notiStore.removeFromErrors(error);
    setOpen(false);
    if (callback) {
      callback();
    }
  }, [error, setOpen, callback]);

  // rendering user provided error component
  if (renderError) {
    return renderError(error, handleClose);
  }

  const handleExpandDetails = useCallback(
    (event: Ui5CustomEvent<LinkDomRef, any>) => {
      event.preventDefault();
      event.stopPropagation();
      setExpandDetails(!expandDetails);
    },
    [expandDetails, setExpandDetails]
  );

  return createPortal(
    <MessageBox
      open={open}
      actions={["Close"]}
      type={"Error"}
      onClose={handleClose}
    >
      {error.message}

      {error.details && (
        <div style={{ marginTop: "2rem" }}>
          <Link onClick={handleExpandDetails}>
            {translate("general.showDetails")}
          </Link>
          {expandDetails && (
            <div style={{ marginTop: "2rem" }}>{error.details}</div>
          )}
        </div>
      )}
    </MessageBox>,

    document.body
  );
};
