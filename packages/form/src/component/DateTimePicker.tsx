import { DateTimePicker as UI5DateTimePicker } from "@ui5/webcomponents-react";
import { Ui5CustomEvent } from "@ui5/webcomponents-react";
import {
  DateTimePickerDomRef,
  DateTimePickerPropTypes,
} from "@ui5/webcomponents-react";
import clsx from "clsx";
import {
  KeyboardEvent,
  forwardRef,
  useCallback,
  useContext,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { createUseStyles } from "react-jss";

import { FormAdapterContext } from "../form/FormAdapter";
import { useWaitForWebcomponent } from "../hook/useWaitForWebcomponent";
import { SharedHtmlPropsWithKeyInput } from "./SharedHtmlProps";
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

export type DateTimePickerProps<TDate extends Date | string = string> =
  SharedHtmlPropsWithKeyInput &
    Pick<
      DateTimePickerPropTypes,
      | "disabled"
      | "formatPattern"
      | "hideWeekNumbers"
      | "name"
      | "onInput"
      | "onKeyPress"
      | "placeholder"
      | "required"
      | "readonly"
      | "valueState"
      | "valueStateMessage"
    > & {
      /** Value of date-time input-field */
      value?: Date | TDate;
      /** Earliest date to be selected */
      minDate?: Date | TDate;
      /** Latest date to be selected */
      maxDate?: Date | TDate;
      /** Custom UI5 Event Handler that fires after value changes */
      onChange?: (
        event: Ui5CustomEvent<
          DateTimePickerDomRef,
          { valid: boolean; value: string }
        >,
        value: TDate | null
      ) => void;
    };

/** `DateTimePicker` as a Wrapper of
 * <a href="https://sap.github.io/ui5-webcomponents-react/?path=/docs/inputs-datetimepicker--docs" target="_blank">Ui5 DateTime Picker</a>
 * adding additional functionalities and handling specific to date picking.
 */
export const DateTimePicker = forwardRef<
  DateTimePickerDomRef | undefined,
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
    const ref = useRef<DateTimePickerDomRef>();

    // forward our internal ref as external
    useImperativeHandle(forwardedRef, () => ref.current);

    const {
      dateTime: { format, parse },
    } = useContext(FormAdapterContext);

    const ui5Loaded = useWaitForWebcomponent("ui5-date-picker");

    // Workaround: API of UI5 Datepicker supports only user formatted date strings as input and output
    // that's why we need to transform our used date objects to string and vice versa with their private API
    const [isRefSet, setIsRefSet] = useState(false);

    const setRef = useCallback(
      (ui5DateTimePicker: null | DateTimePickerDomRef) => {
        if (ui5DateTimePicker == null) {
          ref.current = undefined;
          return;
        }
        ref.current = ui5DateTimePicker as any;

        setIsRefSet(true);
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
      (
        event: Ui5CustomEvent<
          DateTimePickerDomRef,
          { value: string; valid: boolean }
        >
      ) => {
        if (!ui5Loaded) {
          return;
        }
        if (onChange != null) {
          const value: Date | undefined | null = event.target.dateValue;
          const formattedValue = event.detail.value;

          const normalizedValue =
            value == null || !formattedValue ? null : (format(value) as any);

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

    const finalValues = useMemo(() => {
      // @ts-ignore
      const formatToUiString = ref.current?.formatValue?.bind(ref.current);
      if (!ui5Loaded || !formatToUiString) {
        return { value: "" };
      }

      const normalizedValue = convertToDate(value, parse);
      const normalizedMinDate = convertToDate(minDate, parse);
      const normalizedMaxDate = convertToDate(maxDate, parse);
      return {
        value: normalizedValue ? formatToUiString(normalizedValue) : "",
        minDate: normalizedMinDate
          ? formatToUiString(normalizedMinDate)
          : undefined,
        maxDate: normalizedMaxDate
          ? formatToUiString(normalizedMaxDate)
          : undefined,
      };
    }, [ui5Loaded, isRefSet, value, minDate, maxDate]);

    return (
      <UI5DateTimePicker
        {...props}
        className={clsx(className, classes.fixWidth)}
        ref={setRef}
        value={finalValues.value}
        minDate={finalValues.minDate}
        maxDate={finalValues.maxDate}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onKeyPress={handleKeyPress}
      />
    );
  }
);
