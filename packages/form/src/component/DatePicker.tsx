import { DatePicker as UI5DatePicker } from "@ui5/webcomponents-react";
import { Ui5CustomEvent } from "@ui5/webcomponents-react";
import {
  DatePickerDomRef,
  DatePickerPropTypes,
} from "@ui5/webcomponents-react";
import {
  KeyboardEvent,
  ReactElement,
  Ref,
  forwardRef,
  useCallback,
  useContext,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";

import { FormAdapterContext } from "../form/FormAdapter";
import { useWaitForWebcomponent } from "../hook/useWaitForWebcomponent";
import { GlobalHtmlKeyInputElementProps } from "./GlobalHtmlElementProps";
import { triggerSubmitOnEnter } from "./util";

const convertToDate = (
  value: Date | any,
  parse: (value: any) => Date | null
): Date | null => {
  return value == null ? null : value instanceof Date ? value : parse(value);
};

/**
 * Simplified interface for DateFormat
 * see https://sapui5.hana.ondemand.com/sdk/#/api/sap.ui.core.format.DateFormat%23methods/sap.ui.core.format.DateFormat.getTimeInstance
 */
interface SapCoreDateFormat {
  /**
   * Formats date in the desired format (already set). Invalid returns empty string.
   * @param date
   */
  formatToUiString: (date: Date) => string;
}

// finally: union of the wanted props with our own props
export type DatePickerProps<TDate extends Date | string = string> =
  GlobalHtmlKeyInputElementProps<DatePickerDomRef> &
    Pick<
      DatePickerPropTypes,
      | "disabled"
      | "formatPattern"
      | "hideWeekNumbers"
      | "name"
      | "onInput"
      | "placeholder"
      | "required"
      | "readonly"
      | "valueState"
      | "valueStateMessage"
    > & {
      /** Value of date-time input field */
      value?: Date | TDate;
      /** Disables all dates before this date */
      minDate?: Date | TDate;
      /** Disables all dates after this date */
      maxDate?: Date | TDate;
      /** Custom UI5 event handler that fires when the field loses focus. */
      onChange?: (
        event: Ui5CustomEvent<
          DatePickerDomRef,
          { valid: boolean; value: string }
        >,
        value: TDate | null
      ) => void;
    };

/**
 *`DatePicker` as a Wrapper of
 * <a href="https://sap.github.io/ui5-webcomponents-react/?path=/docs/inputs-datepicker--docs" target="_blank">UI5 DatePicker</a> designed to simplify the handling of date values
 * by minimizing the need for additional date manipulation. <br/>
 * Now it is no longer neccessary to format the date before passing it as a `value` to the DatePicker. <br/>
 * Dates can be retained in the format as received from the server. The Datepicker automatically
 *  manages the formatting of these dates, ensurring for a more seamless integration.
 *
 * ```tsx
 *  //ISO8601 String
 *  <DatePicker
 *    value={"2024-04-30T09:52:17Z"}
 *    onChange={(
 *      event: Ui5CustomEvent<
 *        DatePickerDomRef,
 *        { valid: boolean; value: string }
 *      >,
 *      value: string | null
 *   ): void => {
 *     if (event.detail.valid) {
 *        console.log("Valid date from event:", event.detail.value);
 *        console.log(typeof value);
 *     } else {
 *       console.error("Invalid date entered");
 *     }
 *    }}
 *  />
 * ```
 *
 *  ```tsx
 * //Date Object
 * <FormAdapter date={IdentityDateAdapter}>
 *  <DatePicker
 *    value={new Date()}
 *    onChange={(
 *      event: Ui5CustomEvent<
 *        DatePickerDomRef,
 *        { valid: boolean; value: string }
 *      >,
 *      value: Date | null
 *    ): void => {
 *      if (event.detail.valid) {
 *        console.log("Valid date from event:", event.detail.value);
 *        console.log(typeof value);
 *      } else {
 *        console.error("Invalid date entered");
 *      }
 *     }}
    />
 * </FormAdapter>
 * ```
 *  If you retrieve the value from the DatePicker, you will receive it in its original form, just as it was provided.
 */
export const DatePicker = forwardRef<
  DatePickerDomRef | undefined,
  DatePickerProps
>((props, forwardedRef) => {
  const {
    className,
    value,
    minDate,
    maxDate,
    onChange,
    onKeyPress,
    ...passThroughProps
  } = props;
  const ref = useRef<DatePickerDomRef>();

  // forward our internal ref as external
  useImperativeHandle(forwardedRef, () => ref.current);

  const {
    date: { format, parse },
  } = useContext(FormAdapterContext);

  const ui5Loaded = useWaitForWebcomponent("ui5-date-picker");

  // Workaround: API of UI5 Datepicker supports only user formatted date strings as input and output
  // that's why we need to transform our used date objects to string and vice versa with their API
  const [isRefSet, setIsRefSet] = useState(false);

  const setRef = useCallback((ui5DatePicker: null | DatePickerDomRef) => {
    if (ui5DatePicker == null) {
      ref.current = undefined;
      return;
    }
    ref.current = ui5DatePicker;

    setIsRefSet(true);
  }, []);

  const handleChange = useCallback(
    (
      event: Ui5CustomEvent<DatePickerDomRef, { value: string; valid: boolean }>
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
    (event: KeyboardEvent<DatePickerDomRef>) => {
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
    <UI5DatePicker
      {...passThroughProps}
      className={className}
      ref={setRef}
      value={finalValues.value}
      minDate={finalValues.minDate}
      maxDate={finalValues.maxDate}
      onChange={handleChange}
      onKeyPress={handleKeyPress}
    />
  );
}) as <TDate extends Date | string = string>(
  p: DatePickerProps<TDate> & {
    ref?: Ref<DatePickerDomRef | undefined>;
  }
) => ReactElement;
