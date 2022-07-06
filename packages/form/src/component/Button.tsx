import {
  ButtonDomRef,
  ButtonPropTypes,
  Button as UI5Button,
} from "@ui5/webcomponents-react";
import { FC, MouseEvent, useCallback } from "react";

import { triggerReset, triggerSubmit } from "./util";

export interface ButtonProps extends Omit<ButtonPropTypes, "submits"> {
  form?: string;
  type?: "button" | "submit" | "reset";
}

export const Button: FC<ButtonProps> = ({ form, type, onClick, ...others }) => {
  const handleClick = useCallback(
    (event: MouseEvent<ButtonDomRef>) => {
      if (onClick != null) {
        onClick(event);
      }

      // submit/reset when not prevented
      if (!event.defaultPrevented) {
        if (type === "submit") {
          triggerSubmit(event, form);
        } else if (type === "reset") {
          triggerReset(event, form);
        }
      }
    },
    [type, form, onClick]
  );
  return <UI5Button {...others} onClick={handleClick} />;
};
