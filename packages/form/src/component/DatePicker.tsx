import {
  DatePickerDomRef,
  DatePickerPropTypes,
  DatePicker as UI5DatePicker,
} from "@ui5/webcomponents-react";
import {
  FocusEvent,
  KeyboardEvent,
  MutableRefObject,
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
import { useEventCallback } from "usehooks-ts";

import { FormAdapterContext } from "../form/FormAdapter";
import {
  TypedCustomEvent,
  useCustomEventDispatcher,
} from "../hook/useCustomEventDispatcher";
import { useWaitForWebcomponent } from "../hook/useWaitForWebcomponent";
import { GlobalHtmlKeyInputElementProps } from "./GlobalHtmlElementProps";
import { useFireSubmit } from "./util";

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
      /** Fired when the input operation has finished by pressing Enter or on focusout. */
      onChange?: (
        event: TypedCustomEvent<DatePickerDomRef, { value: TDate | undefined }>
      ) => void;
      /** Fired when the input operation has finished by pressing Enter */
      onSubmit?: (
        event: TypedCustomEvent<DatePickerDomRef, { value: TDate | undefined }>
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
 *    onChange={(event) => {
 *      console.log(event.detail.value);
 *      console.log(typeof event.detail.value
 *    }}
 *  />
 * ```
 *
 *  ```tsx
 * //Date Object
 * <FormAdapter date={IdentityDateAdapter}>
 *  <DatePicker
 *   value={new Date()}
 *   onChange={(event) => {
 *      console.log(event.detail.value);
 *      console.log(typeof event.detail.value
 *    }}
 *  />
 * </FormAdapter>
 * ```
 *  If you retrieve the value from the DatePicker, you will receive it in its original form, just as it was provided.
 */
export const DatePicker = forwardRef<DatePickerDomRef | null, DatePickerProps>(
  (props, forwardedRef) => {
    const {
      className,
      value,
      minDate,
      maxDate,
      onFocus,
      onKeyDown,
      onKeyUp,
      onChange,
      onSubmit,
      ...passThroughProps
    } = props;
    const ref = useRef<DatePickerDomRef>(
      null
    ) as MutableRefObject<DatePickerDomRef | null>;

    // forward our internal ref as external
    useImperativeHandle<DatePickerDomRef | null, DatePickerDomRef | null>(
      forwardedRef,
      () => ref.current
    );

    const {
      date: { format, parse },
    } = useContext(FormAdapterContext);

    const ui5Loaded = useWaitForWebcomponent("ui5-date-picker");

    // Workaround: API of UI5 Datepicker supports only user formatted date strings as input and output
    // that's why we need to transform our used date objects to string and vice versa with their API
    const [isRefSet, setIsRefSet] = useState(false);

    const setRef = useCallback((ui5DatePicker: null | DatePickerDomRef) => {
      if (ui5DatePicker == null) {
        ref.current = null;
        return;
      }
      ref.current = ui5DatePicker;

      setIsRefSet(true);
    }, []);

    const lastValue = useRef<string | undefined>(
      value instanceof Date ? (format(value) as string | undefined) : undefined
    );
    const submit = useFireSubmit();

    const dispatchChangeEvent = useCustomEventDispatcher<
      DatePickerDomRef,
      {
        value: string | undefined;
      }
    >({
      ref: ref,
      name: "cpro-change",
      onEvent: onChange,
    });

    const dispatchSubmitEvent = useCustomEventDispatcher<
      DatePickerDomRef,
      {
        value: string | undefined;
      }
    >({
      ref: ref,
      name: "cpro-submit",
      onEvent: onSubmit,
    });

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
        onFocus={useEventCallback((e) => {
          submit.focus();
          onFocus?.(e as FocusEvent<DatePickerDomRef>);
        })}
        onKeyDown={useEventCallback((e) => {
          submit.keyDown(e);
          onKeyDown?.(e as KeyboardEvent<DatePickerDomRef>);
        })}
        onKeyUp={useEventCallback(async (event) => {
          onKeyUp?.(event as KeyboardEvent<DatePickerDomRef>);
          if (submit.shouldFireSubmitOnKeyUp()) {
            // no change fired before -> user just pressed enter again -> trigger submit
            setTimeout(() => {
              dispatchSubmitEvent({
                value: lastValue.current,
              });
            }, 0);
          }
        })}
        onChange={useEventCallback(async (event) => {
          // don't bubble up this event -> we trigger our own enhanced event
          event.stopPropagation();

          if (!ui5Loaded) {
            return;
          }
          const value: Date | undefined | null = event.target.dateValue;
          const formattedValue = event.detail.value;

          const normalizedValue =
            value == null || !formattedValue
              ? undefined
              : (format(value) as any);

          lastValue.current = normalizedValue;
          dispatchChangeEvent({
            value: normalizedValue,
          });

          if (submit.shouldFireSubmitOnChange()) {
            // change event was triggered by enter --> submit
            setTimeout(() => {
              dispatchSubmitEvent({
                value: normalizedValue,
              });
            }, 0);
          }
        })}
      />
    );
  }
) as <TDate extends Date | string = string>(
  p: DatePickerProps<TDate> & {
    ref?: Ref<DatePickerDomRef | undefined>;
  }
) => ReactElement;
