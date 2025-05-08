import {
  TimePickerDomRef,
  TimePickerPropTypes,
  TimePicker as UI5TimePicker,
} from "@ui5/webcomponents-react";
import {
  FocusEvent,
  KeyboardEvent,
  MutableRefObject,
  ReactElement,
  Ref,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { useEventCallback } from "usehooks-ts";

import {
  TypedCustomEvent,
  useCustomEventDispatcher,
} from "../hook/useCustomEventDispatcher";
import { GlobalHtmlKeyInputElementProps } from "./GlobalHtmlElementProps";
import { useFireSubmit } from "./util";

export const durationToTime = (
  duration: string,
  formatPattern: string
): string => {
  const parts = duration.split(":");
  const length = formatPattern.split(":").length;
  return parts.slice(0, length).join(":");
};

export const normalizeTimeValue = (
  timeInput: string,
  formatPattern: string
): string => {
  const parts = timeInput.split(":");

  while (parts.length < 3) {
    parts.push("00");
  }

  return parts.join(":");
};

export type TimePickerProps = GlobalHtmlKeyInputElementProps<TimePickerDomRef> &
  Pick<
    TimePickerPropTypes,
    | "disabled"
    | "formatPattern"
    | "name"
    | "placeholder"
    | "required"
    | "readonly"
    | "valueState"
    | "valueStateMessage"
  > & {
    formatPattern?: "HH:mm" | "HH:mm:ss";
    value?: string; // expected: "HH:mm:ss"
    onChange?: (
      event: TypedCustomEvent<TimePickerDomRef, { value: string | undefined }>
    ) => void;
    onSubmit?: (
      event: TypedCustomEvent<TimePickerDomRef, { value: string | undefined }>
    ) => void;
  };

export const TimePicker = forwardRef<TimePickerDomRef | null, TimePickerProps>(
  (props, forwardedRef) => {
    const {
      className,
      value,
      onFocus,
      onKeyDown,
      onKeyUp,
      onChange,
      onSubmit,
      formatPattern = "HH:mm",
      ...passThroughProps
    } = props;

    const ref = useRef<TimePickerDomRef>(
      null
    ) as MutableRefObject<TimePickerDomRef | null>;

    useImperativeHandle<TimePickerDomRef | null, TimePickerDomRef | null>(
      forwardedRef,
      () => ref.current,
      []
    );

    const [isRefSet, setIsRefSet] = useState(false);

    const setRef = useCallback((ui5TimePicker: TimePickerDomRef | null) => {
      ref.current = ui5TimePicker;
      setIsRefSet(true);
    }, []);

    const submit = useFireSubmit();

    const dispatchChangeEvent = useCustomEventDispatcher<
      TimePickerDomRef,
      { value: string | undefined }
    >({
      ref,
      name: "cpro-change",
      onEvent: onChange,
    });

    const dispatchSubmitEvent = useCustomEventDispatcher<
      TimePickerDomRef,
      { value: string | undefined }
    >({
      ref,
      name: "cpro-submit",
      onEvent: onSubmit,
      delay: 0,
    });

    const lastValue = useRef<string | undefined>(value);

    const finalValue = value ? durationToTime(value, formatPattern) : "";

    return (
      <UI5TimePicker
        {...passThroughProps}
        ref={setRef}
        className={className}
        formatPattern={formatPattern}
        value={finalValue}
        onFocus={useEventCallback((e) => {
          submit.focus();
          onFocus?.(e as FocusEvent<TimePickerDomRef>);
        })}
        onKeyDown={useEventCallback((e) => {
          submit.keyDown(e);
          onKeyDown?.(e as KeyboardEvent<TimePickerDomRef>);
        })}
        onKeyUp={useEventCallback((event) => {
          onKeyUp?.(event as KeyboardEvent<TimePickerDomRef>);
          if (submit.shouldFireSubmitOnKeyUp()) {
            dispatchSubmitEvent({ value: lastValue.current });
          }
        })}
        onChange={useEventCallback((event) => {
          event.stopPropagation();

          const rawTime = event.detail.value;
          const valid = event.detail.valid;
          const formatted = valid
            ? normalizeTimeValue(rawTime, formatPattern)
            : undefined;

          lastValue.current = formatted;
          dispatchChangeEvent({ value: formatted });

          if (submit.shouldFireSubmitOnChange()) {
            dispatchSubmitEvent({ value: formatted });
          }
        })}
      />
    );
  }
) as (
  p: TimePickerProps & { ref?: Ref<TimePickerDomRef | undefined> }
) => ReactElement;
