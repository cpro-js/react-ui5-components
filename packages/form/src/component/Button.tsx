import {
  ButtonDomRef,
  ButtonPropTypes,
  Button as UI5Button,
} from "@ui5/webcomponents-react";
import { FC, HTMLAttributes, MouseEvent, useCallback } from "react";

import { triggerReset, triggerSubmit } from "./util";

//pick only props we need
type SharedHtmlProps = Pick<
  HTMLAttributes<HTMLElement>,
  | "style"
  | "className"
  | "id"
  | "title"
  | "onBlur"
  | "onFocus"
  | "onMouseOver"
  | "onMouseOut"
  | "onMouseEnter"
  | "onMouseLeave"
  | "onMouseMove"
>;

export type ButtonProps = SharedHtmlProps &
  Pick<
    ButtonPropTypes,
    | "onClick"
    | "design"
    | "disabled"
    | "icon"
    | "iconEnd"
    | "tooltip"
    | "accessibleName"
    | "accessibleNameRef"
  > & {
    /** Optional property, use when refering to an external form by ID */
    form?: string;
    /** Optional property, defines type of button */
    type?: "button" | "submit" | "reset";
  };

export interface ButtonPropsTest
  extends Omit<ButtonPropTypes, "submits" | "type"> {
  /** Optional property, use when refering to an external form by ID */
  form?: string;
  /** Optional property, defines type of button */
  type?: "button" | "submit" | "reset";
}

/** `Button` wrapper for
 *  <a href="https://sap.github.io/ui5-webcomponents-react/?path=/docs/inputs-button--docs" target="_blank">Ui5 Button</a> adding
 * specific behavior related to form submission and reset functionality.
 */
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
