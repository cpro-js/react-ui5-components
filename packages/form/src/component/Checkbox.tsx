import { CheckBox as UI5Checkbox } from "@ui5/webcomponents-react";
import { Ui5CustomEvent } from "@ui5/webcomponents-react/interfaces/Ui5CustomEvent";
import { CheckBoxPropTypes } from "@ui5/webcomponents-react/webComponents/CheckBox";
import {
  ChangeEvent,
  FC,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

export interface CheckboxProps extends Omit<CheckBoxPropTypes, "onChange"> {
  /**
   * The value of the component. The DOM API casts this to a string. The browser uses "on" as the default value.
   */
  value?: string;
  /**
   * HTML checkbox compliant event handler (except that the input type is hidden instead of checkbox)
   * @param event
   */
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Checkbox wrapper to transform the UI5 checkbox into a HTML compliant checkbox
 */
export const Checkbox: FC<CheckboxProps> = forwardRef<
  HTMLInputElement | undefined,
  CheckboxProps
>(
  (
    { name, value = "on", checked, disabled, onChange, ...props },
    forwardedRef
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isChecked, setChecked] = useState<boolean | undefined>(checked);

    const handleChange = useCallback(
      (
        event: Ui5CustomEvent<HTMLInputElement> | ChangeEvent<HTMLInputElement>
      ) => {
        if (inputRef.current != null && inputRef.current !== event.target) {
          setChecked(event.target.checked);
          inputRef.current.disabled = !event.target.checked;
          inputRef.current.checked = event.target.checked;

          const customEvent = new Event("change", {
            bubbles: true,
            cancelable: true,
          });

          inputRef.current.dispatchEvent(customEvent);
        }

        if (inputRef.current === event.target) {
          onChange(event as ChangeEvent<HTMLInputElement>);
        }
      },
      [setChecked, onChange]
    );

    // sync external changes back to input
    useEffect(() => {
      setChecked(checked);
    }, [setChecked, checked]);

    // Note input type checkbox will be only submitted as part of the form if it's checked
    // That's why we disable the input in unchecked state to prevent it from being submitted
    return (
      <UI5Checkbox
        {...props}
        ref={forwardedRef}
        checked={isChecked}
        disabled={disabled}
        onChange={handleChange}
      >
        <input
          ref={inputRef}
          type="hidden"
          disabled={disabled || !isChecked}
          name={name}
          value={value}
          checked={isChecked}
          readOnly
        />
      </UI5Checkbox>
    );
  }
);
