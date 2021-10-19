import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";

import { DateTimePicker as UI5DateTimePicker } from "@ui5/webcomponents-react";
import { Ui5CustomEvent } from "@ui5/webcomponents-react/interfaces/Ui5CustomEvent";
import { Ui5DateTimePickerDomRef } from "@ui5/webcomponents-react/interfaces/Ui5DateTimePickerDomRef";
import { DateTimePickerPropTypes } from "@ui5/webcomponents-react/webComponents/DateTimePicker";
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

import { FormAdapterContext } from "../form/FormAdapter";
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
  formatToUiString: (dateTime: Date) => string;
}

const convertToDate = (
  value: Date | any,
  parse: (value: any) => Date | null
): Date | null => {
  return value == null ? null : value instanceof Date ? value : parse(value);
};

export interface DateTimePickerProps<
  TDate extends Date | string | number = string
> extends Omit<
    DateTimePickerPropTypes,
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

export const DateTimePicker: FC<DateTimePickerProps<string>> = forwardRef<
  HTMLInputElement | undefined,
  DateTimePickerProps
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

    const {
      dateTime: { format, parse },
    } = useContext(FormAdapterContext);

    const ui5Loaded = useWaitForWebcomponent("ui5-date-picker");

    // Workaround: API of UI5 Datepicker supports only user formatted date strings as input and output
    // that's why we need to transform our used date objects to string and vice versa with their private API
    const [{ formatToUiString }, setDateFormat] = useState<
      Partial<SapCoreDateFormat>
    >({});

    const setRef = useCallback(
      (ui5DatePicker: null | Ui5DateTimePickerDomRef) => {
        if (ui5DatePicker == null) {
          ref.current = undefined;
          return;
        }
        ref.current = ui5DatePicker as any;

        setDateFormat({
          formatToUiString(dateTime: Date) {
            // todo return type of formatValue is incorrect (void instead of string)
            return ui5DatePicker.formatValue(dateTime) as any as string;
          },
        });
      },
      []
    );

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

          const normalizedValue = value == null ? null : (format(value) as any);

          onChange(event, normalizedValue);
        }
      },
      [onChange, ui5Loaded, format]
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

    const normalizedValue = convertToDate(value, parse);
    const normalizedMinDate = convertToDate(minDate, parse);
    const normalizedMaxDate = convertToDate(maxDate, parse);

    return (
      <UI5DateTimePicker
        {...props}
        className={clsx(className, classes.fixWidth)}
        ref={setRef}
        value={
          ui5Loaded && formatToUiString != null && normalizedValue != null
            ? formatToUiString(normalizedValue)
            : ""
        }
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onKeyPress={handleKeyPress}
        minDate={
          ui5Loaded && formatToUiString != null && normalizedMinDate != null
            ? formatToUiString(normalizedMinDate)
            : undefined
        }
        maxDate={
          ui5Loaded && formatToUiString != null && normalizedMaxDate != null
            ? formatToUiString(normalizedMaxDate)
            : undefined
        }
      />
    );
  }
);