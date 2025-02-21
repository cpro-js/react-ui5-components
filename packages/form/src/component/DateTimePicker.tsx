import {
  DatePickerDomRef,
  DateTimePickerDomRef,
  DateTimePickerPropTypes,
  DateTimePicker as UI5DateTimePicker,
} from "@ui5/webcomponents-react";
import {
  FocusEvent,
  KeyboardEvent,
  MutableRefObject,
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
  GlobalHtmlKeyInputElementProps<DateTimePickerDomRef> &
    Pick<
      DateTimePickerPropTypes,
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
      /** Value of date-time input-field */
      value?: Date | TDate;
      /** Earliest date to be selected */
      minDate?: Date | TDate;
      /** Latest date to be selected */
      maxDate?: Date | TDate;
      /** Fired when the input operation has finished by pressing Enter or on focusout. */
      onChange?: (
        event: TypedCustomEvent<
          DateTimePickerDomRef,
          { value: TDate | undefined }
        >
      ) => void;
      /** Fired when the input operation has finished by pressing Enter */
      onSubmit?: (
        event: TypedCustomEvent<
          DateTimePickerDomRef,
          { value: TDate | undefined }
        >
      ) => void;
    };

/** `DateTimePicker` as a Wrapper of
 * <a href="https://sap.github.io/ui5-webcomponents-react/?path=/docs/inputs-datetimepicker--docs" target="_blank">Ui5 DateTime Picker</a>
 * adding additional functionalities and handling specific to date picking.
 */
export const DateTimePicker = forwardRef<
  DateTimePickerDomRef | null,
  DateTimePickerProps
>(
  (
    {
      className,
      value,
      minDate,
      maxDate,
      onFocus,
      onKeyDown,
      onKeyUp,
      onChange,
      onSubmit,
      ...props
    },
    forwardedRef
  ) => {
    const ref = useRef<DateTimePickerDomRef>(
      null
    ) as MutableRefObject<DateTimePickerDomRef | null>;

    // forward our internal ref as external
    useImperativeHandle<
      DateTimePickerDomRef | null,
      DateTimePickerDomRef | null
    >(forwardedRef, () => ref.current);

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
          ref.current = null;
          return;
        }
        ref.current = ui5DateTimePicker as any;

        setIsRefSet(true);
      },
      []
    );

    const lastValue = useRef<string | undefined>(
      value instanceof Date ? (format(value) as string | undefined) : undefined
    );
    const submit = useFireSubmit();

    const dispatchChangeEvent = useCustomEventDispatcher<
      DateTimePickerDomRef,
      {
        value: string | undefined;
      }
    >({
      ref: ref,
      name: "cpro-change",
      onEvent: onChange,
    });

    const dispatchSubmitEvent = useCustomEventDispatcher<
      DateTimePickerDomRef,
      {
        value: string | undefined;
      }
    >({
      ref: ref,
      name: "cpro-submit",
      onEvent: onSubmit,
      delay: 0,
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
      <UI5DateTimePicker
        {...props}
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
          onKeyDown?.(e as KeyboardEvent<DateTimePickerDomRef>);
        })}
        onKeyUp={useEventCallback(async (event) => {
          onKeyUp?.(event as KeyboardEvent<DateTimePickerDomRef>);
          if (submit.shouldFireSubmitOnKeyUp()) {
            // no change fired before -> user just pressed enter again -> trigger submit
            dispatchSubmitEvent({
              value: lastValue.current,
            });
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
            dispatchSubmitEvent({
              value: normalizedValue,
            });
          }
        })}
      />
    );
  }
);
