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
  useContext,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { createUseStyles } from "react-jss";

import { FormAdapter, FormAdapterContext } from "../form/FormAdapter";
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
}

export interface DatePickerProps<TDate extends Date | string | number = string>
  extends Omit<
    DatePickerPropTypes,
    "value" | "minDate" | "maxDate" | "onChange"
  > {
  value?: Date | TDate;
  minDate?: Date | TDate;
  maxDate?: Date | TDate;
  onChange?: (
    event: Ui5CustomEvent<HTMLInputElement, { valid: boolean; value: string }>,
    value: TDate | null
  ) => void;
}

export const DatePicker: FC<DatePickerProps<string>> = forwardRef<
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

    const { date } = useContext(FormAdapterContext);

    const ui5Loaded = useWaitForWebcomponent("ui5-date-picker");

    // Workaround: API of UI5 Datepicker supports only user formatted date strings as input and output
    // that's why we need to transform our used date objects to string and vice versa with their private API
    const [{ format }, setDateFormat] = useState<Partial<SapCoreDateFormat>>(
      {}
    );

    const setRef = useCallback((ui5DatePicker: null | Ui5DatePickerDomRef) => {
      if (ui5DatePicker == null) {
        ref.current = undefined;
        return;
      }
      ref.current = ui5DatePicker as any;

      setDateFormat({
        format(date: Date) {
          // todo return type of formatValue is incorrect (void instead of string)
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
          const value: Date | undefined | null = (event.target as any)
            .dateValue;

          const normalizedValue =
            value == null ? null : (date.format(value) as string);
          onChange(event, normalizedValue);
        }
      },
      [onChange, ui5Loaded, date]
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

    console.log(value);
    const normalizedValue =
      value == null ? null : value instanceof Date ? value : date.parse(value);
    const normalizedMinDate =
      minDate == null
        ? null
        : minDate instanceof Date
        ? minDate
        : date.parse(minDate);
    const normalizedMaxDate =
      maxDate == null
        ? null
        : maxDate instanceof Date
        ? maxDate
        : date.parse(maxDate);

    return (
      <UI5DatePicker
        {...props}
        className={clsx(className, classes.fixWidth)}
        ref={setRef}
        value={
          ui5Loaded && format != null && normalizedValue != null
            ? format(normalizedValue)
            : ""
        }
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onKeyPress={handleKeyPress}
        minDate={
          ui5Loaded && format != null && normalizedMinDate != null
            ? format(normalizedMinDate)
            : undefined
        }
        maxDate={
          ui5Loaded && format != null && normalizedMaxDate != null
            ? format(normalizedMaxDate)
            : undefined
        }
      />
    );
  }
);
