import {
  CheckBoxDomRef,
  CheckBoxPropTypes,
  CheckBox as UI5Checkbox,
  Ui5CustomEvent,
} from "@ui5/webcomponents-react";
import {
  ChangeEvent,
  HTMLAttributes,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

// pick only those props which we do care about
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
  | "color"
  | "hidden"
  | "defaultChecked"
>;

export type CheckBoxProps = SharedHtmlProps &
  Pick<
    CheckBoxPropTypes,
    | "checked"
    | "disabled"
    | "indeterminate"
    | "name"
    | "readonly"
    | "required"
    | "text"
    | "valueState"
    | "wrappingType"
  > & {
    /**
     * The value of the component. The DOM API casts this to a string. The browser uses "on" as the default value.
     */
    value?: string;
    /**
     * HTML checkbox compliant event handler (except that the input type is hidden instead of checkbox)
     * @param event
     */
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  };

/**
 * `Checkbox` wrapper to transform the
 * <a href="https://sap.github.io/ui5-webcomponents-react/?path=/docs/inputs-checkbox--docs" target="_blank">UI5 Checkbox</a>
 * into a HTML compliant checkbox
 */
export const Checkbox = forwardRef<CheckBoxDomRef, CheckBoxProps>(
  (
    { name, value = "on", checked, disabled, onChange, ...props },
    forwardedRef
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isChecked, setChecked] = useState<boolean | undefined>(checked);

    const handleChange = useCallback(
      (
        event: Ui5CustomEvent<CheckBoxDomRef> | ChangeEvent<HTMLInputElement>
      ) => {
        if (inputRef.current != null && inputRef.current !== event.target) {
          setChecked(event.target.checked);
          inputRef.current.disabled = !event.target.checked;
          inputRef.current.checked = !!event.target.checked;

          const customEvent = new Event("change", {
            bubbles: true,
            cancelable: true,
          });

          inputRef.current.dispatchEvent(customEvent);
        }

        if (inputRef.current === event.target) {
          // use only the change event of the internal input
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
