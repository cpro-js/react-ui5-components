import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";

import { DatePicker as UI5DatePicker } from "@ui5/webcomponents-react";
import { Ui5CustomEvent } from "@ui5/webcomponents-react/interfaces/Ui5CustomEvent";
import { Ui5DatePickerDomRef } from "@ui5/webcomponents-react/interfaces/Ui5DatePickerDomRef";
import { DatePickerPropTypes } from "@ui5/webcomponents-react/webComponents/DatePicker";
import clsx from "clsx";
import {
  FC,
  KeyboardEvent,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { createUseStyles } from "react-jss";

import { useWaitForWebcomponent } from "../hook/useWaitForWebcomponent";
import { triggerSubmitOnEnter } from "./util";

const useStyles = createUseStyles({
  fixWidth: {
    minWidth: "var(--_ui5_input_width)",
    width: "var(--_ui5_input_width)",
  },
});

/**
 * Simplified interface for DateFormat
 * see https://sapui5.hana.ondemand.com/sdk/#/api/sap.ui.core.format.DateFormat%23methods/sap.ui.core.format.DateFormat.getTimeInstance
 */
interface SapCoreDateFormat {
  /**
   * Formats date in the desired format (already set). Invalid returns empty string.
   * @param date
   */
  format: (date: Date) => string;
  /**
   * Parses date string into Date. Invalid values seems to return null.
   * TODO identify scenarios when array of dates will be returned
   *
   * @param date
   */
  parse: (date: string) => Date | null;
}

export interface DatePickerProps
  extends Omit<
    DatePickerPropTypes,
    "value" | "minDate" | "maxDate" | "onChange"
  > {
  value?: Date | number;
  minDate?: Date | number;
  maxDate?: Date | number;
  onChange?: (
    event: Ui5CustomEvent<HTMLInputElement, { valid: boolean; value: string }>,
    value: Date | null
  ) => void;
}

export const DatePicker: FC<DatePickerProps> = forwardRef<
  HTMLInputElement | undefined,
  DatePickerProps
>(
  (
    {
      className,
      value,
      minDate,
      maxDate,
      onChange,
      onKeyDown,
      onKeyPress,
      ...props
    },
    forwardedRef
  ) => {
    const classes = useStyles();
    const ref = useRef<HTMLInputElement>();
    // forward our internal ref as external
    useImperativeHandle(forwardedRef, () => ref.current);

    const ui5Loaded = useWaitForWebcomponent("ui5-date-picker");

    // Workaround: API of UI5 Datepicker supports only user formatted date strings as input and output
    // that's why we need to transform our used date objects to string and vice versa with their private API
    const [{ format, parse }, setDateFormat] = useState<
      Partial<SapCoreDateFormat>
    >({});

    const setRef = useCallback((ui5DatePicker: null | Ui5DatePickerDomRef) => {
      if (ui5DatePicker == null) {
        ref.current = undefined;
        return;
      }
      ref.current = ui5DatePicker as any;

      setDateFormat({
        parse(date: string) {
          // private api...
          return (ui5DatePicker as any).getFormat().parse(date);
        },
        format(date: Date) {
          // todo types are wrong
          return ui5DatePicker.formatValue(date) as any as string;
        },
      });
    }, []);

    const handleKeyDown = useCallback(
      (event: KeyboardEvent<HTMLElement>) => {
        // Fix: As long as the user is typing within the input ensure that no one else can catch these events
        // Background: Storybook is catching these events and triggering their shortcuts
        event.stopPropagation();
        if (onKeyDown != null) {
          onKeyDown(event);
        }
      },
      [onKeyDown]
    );

    const handleChange = useCallback(
      (event: Ui5CustomEvent<HTMLInputElement>) => {
        if (!ui5Loaded) {
          return;
        }
        if (onChange != null) {
          const value = parse == null ? null : parse(event.target.value);
          onChange(event, value);
        }
      },
      [onChange, parse, ui5Loaded]
    );

    const handleKeyPress = useCallback(
      (event: KeyboardEvent<HTMLElement>) => {
        // Workaround: Webcomponents catches enter -> need to submit manually
        // see https://github.com/SAP/ui5-webcomponents/pull/2855/files
        triggerSubmitOnEnter(event);
        if (onKeyPress != null) {
          onKeyPress(event);
        }
      },
      [onKeyPress]
    );

    return (
      <UI5DatePicker
        {...props}
        className={clsx(className, classes.fixWidth)}
        ref={setRef}
        value={
          ui5Loaded && format != null && value != null
            ? format(new Date(value))
            : ""
        }
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onKeyPress={handleKeyPress}
        minDate={
          ui5Loaded && format != null && minDate != null
            ? format(new Date(minDate))
            : undefined
        }
        maxDate={
          ui5Loaded && format != null && maxDate != null
            ? format(new Date(maxDate))
            : undefined
        }
      />
    );
  }
);
