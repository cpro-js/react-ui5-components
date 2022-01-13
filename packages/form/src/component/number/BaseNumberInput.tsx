import { Input, InputType } from "@ui5/webcomponents-react";
import {
  InputDomRef,
  InputPropTypes,
} from "@ui5/webcomponents-react/webComponents/Input";
import {
  ClipboardEvent,
  FC,
  KeyboardEvent,
  forwardRef,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";

import { triggerSubmitOnEnter } from "../util";
import { NumberContext } from "./context/NumberContext";
import {
  getCurrencyConfig,
  getCurrencyFormatter,
} from "./helper/CurrencyHelper";
import { getFormatter } from "./helper/NumberFormatter";
import { getParser } from "./helper/NumberParser";

/**
 * Shared props among all number inputs.
 */
export interface CommonNumberInputProps
  extends Omit<
    InputPropTypes,
    | "type"
    | "value"
    | "maxlength"
    | "showSuggestions"
    | "onSuggestionItemPreview"
    | "onSuggestionItemSelect"
  > {
  value?: number;
  onValue?: (value?: number) => void;
  locale?: string;
  max?: number;
}

export interface BaseNumberInputProps extends CommonNumberInputProps {
  displayConfig: Intl.NumberFormatOptions;
  inputConfig: Intl.NumberFormatOptions;
}

export const BaseNumberInput: FC<BaseNumberInputProps> = forwardRef<
  InputDomRef,
  BaseNumberInputProps
>((props, forwardedRef) => {
  const {
    value,
    locale: explicitLocale,
    onValue,
    displayConfig,
    inputConfig,
    max,
    onKeyDown: onKeyDownOriginal,
    onKeyUp: onKeyUpOriginal,
    onFocus: onFocusOriginal,
    onBlur: onBlurOriginal,
    onPaste: onPasteOriginal,
    onMouseEnter: onMouseEnterOriginal,
    onMouseLeave: onMouseLeaveOriginal,
    ...passThrough
  } = props;

  const numberContext = useContext(NumberContext);
  const locale = explicitLocale || numberContext.locale;
  const currency = inputConfig.currency;
  const isFocusRef = useRef(false);
  const isPasteRef = useRef(false);
  const parser = useMemo(() => getParser(locale), [locale]);
  const groupingSeparator = parser.getGroupingSeparator();
  const decimalSeparator = parser.getDecimalSeparator();
  const lastValueRef = useRef(value);

  const [inputState, setInputState] = useState(false);

  // Format numbers for input
  const formatForInput = useMemo(() => {
    const specialConf = {
      ...inputConfig,
      // always allow for less then the regular fraction digits while typing
      minimumFractionDigits: 0,
      // grouping would change all the time while typing => always off
      useGrouping: false,
    };

    // number input:
    const formatter = getFormatter(
      locale,
      currency ? getCurrencyConfig(specialConf, currency) : specialConf
    );

    return currency
      ? getCurrencyFormatter(formatter, currency)
      : formatter.format;
  }, [inputConfig, locale]);

  // Format numbers for display
  const formatForDisplay = useMemo(() => {
    const conf = currency
      ? getCurrencyConfig(displayConfig, currency)
      : displayConfig;

    // number display: grouping is false by default
    const formatter = getFormatter(locale, {
      useGrouping: false,
      ...conf,
    });

    return currency
      ? getCurrencyFormatter(formatter, currency)
      : formatter.format;
  }, [displayConfig, locale]);

  // number parser with max restriction
  const parseValue = useCallback(
    (inputValue?: string): number | undefined => {
      if (!inputValue) {
        return;
      }

      // parse the formatted number: max restrictions might apply
      let result = parser.parse(formatForInput(parser.parse(inputValue)));

      // check for max number
      const calculatedMax =
        max !== undefined && max < Number.MAX_SAFE_INTEGER
          ? max
          : Number.MAX_SAFE_INTEGER;
      if (result !== undefined && result > calculatedMax) {
        result = calculatedMax;
      }

      return result;
    },
    [parser, formatForInput]
  );

  // current value
  const currentValueRef = useRef(
    value !== undefined ? formatForInput(parseValue(String(value))) : undefined
  );

  const maxFractionDigits = useMemo(() => {
    const decimalTest = formatForInput(0.1111111111111111);

    return decimalTest.length <= 1 ? 0 : decimalTest.length - 2;
  }, [formatForInput]);

  /**
   * Prevent invalid data, e.g. not a number.
   */
  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      const originalValue = event.currentTarget.value;

      if (event.key === "Space") {
        event.preventDefault();
        event.stopPropagation();
        return false;
      }

      /**
       * We're only interested in those keys which change our number value
       * and these consist of a single char.
       * Control keys / special keys get a descriptive name, i.e. longer than 1 char.
       *
       * Special handling:
       * - key combinations (pressing STRG/ALT simultaneously)
       */
      if (
        event.key.length === 1 &&
        !event.ctrlKey &&
        !event.altKey &&
        !event.metaKey &&
        event.key !== "-"
      ) {
        // note: newValue might not be the real current value,
        // since selection & current cursor position are not taken into account
        const newValue = originalValue + event.key;
        const value = parser.parse(newValue);
        const isNan = newValue && value === undefined;

        // no fraction digits, but fraction sign
        const isBlockedFraction =
          maxFractionDigits === 0 && event.key === decimalSeparator;

        // block invalid content
        if (isNan || isBlockedFraction) {
          event.preventDefault();
          event.stopPropagation();
          return false;
        }
      }

      // allow consumers to have access to onKeyDown too
      if (onKeyDownOriginal) {
        onKeyDownOriginal(event);
      }
    },
    [parser, maxFractionDigits, decimalSeparator, onKeyDownOriginal]
  );

  /**
   * Sets the current value, enables submit via enter and triggers events.
   */
  const onKeyUp = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      const originalValue = event.currentTarget.value;
      const parsedValue = parser.parse(originalValue);
      const safeValue = parseValue(originalValue);
      const valueChanged =
        parser.parse(currentValueRef.current) !== parsedValue;

      if (valueChanged) {
        isPasteRef.current = false;

        // value is now invalid, but was valid before
        if (parsedValue === undefined && originalValue !== "") {
          event.currentTarget.value = currentValueRef.current || "";
          return;
        }

        // if parseValue changed the value, then reset the input to our value
        if (safeValue !== parsedValue) {
          currentValueRef.current = formatForInput(safeValue);
          event.currentTarget.value = currentValueRef.current || "";
          return;
        }

        // handle too many fraction digits
        const decIndex = originalValue.indexOf(decimalSeparator);
        const fracDigits =
          decIndex < 0 ? 0 : originalValue.length - 1 - decIndex;
        if (fracDigits > maxFractionDigits) {
          event.currentTarget.value = currentValueRef.current || "";
          return;
        }

        // set the current value
        currentValueRef.current = originalValue;
      }

      // allow for submit via enter
      triggerSubmitOnEnter(event);

      // allow consumers to have access to onKeyUp too
      if (onKeyUpOriginal) {
        onKeyUpOriginal(event);
      }
    },
    [
      parser,
      groupingSeparator,
      decimalSeparator,
      parseValue,
      onValue,
      onKeyUpOriginal,
    ]
  );

  const leaveInputState = useCallback(() => {
    setInputState(false);
    const val = parseValue(currentValueRef.current);
    currentValueRef.current = formatForInput(val);

    // extra method to provide the value as number
    if (onValue) {
      console.log("vvv", `[${val}]`);
      onValue(val);
    }
  }, [setInputState, formatForInput, parseValue]);

  const onFocus = useCallback(
    (event) => {
      isFocusRef.current = true;
      setInputState(true);

      if (onFocusOriginal) {
        onFocusOriginal(event);
      }
    },
    [setInputState, onFocusOriginal]
  );

  const onBlur = useCallback(
    (event) => {
      isFocusRef.current = false;
      leaveInputState();

      if (onBlurOriginal) {
        onBlurOriginal(event);
      }
    },
    [leaveInputState, onBlurOriginal]
  );

  const onMouseEnter = useCallback(
    (event) => {
      setInputState(true);
      if (onMouseEnterOriginal) {
        onMouseEnterOriginal(event);
      }
    },
    [setInputState, onMouseEnterOriginal]
  );

  const onMouseLeave = useCallback(
    (event) => {
      if (!isFocusRef.current) {
        leaveInputState();
      }

      if (onMouseLeaveOriginal) {
        onMouseLeaveOriginal(event);
      }
    },
    [leaveInputState, onMouseLeaveOriginal]
  );

  const onPaste = useCallback(
    (event: ClipboardEvent<HTMLInputElement>) => {
      const data = event.clipboardData.getData("text");
      const parsed = parseValue(data);

      // not a number
      if (parsed === undefined) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      isPasteRef.current = true;

      if (onPasteOriginal) {
        onPasteOriginal(event);
      }
    },
    [parseValue, onPasteOriginal]
  );

  // support externally set values, required for form reset
  if (lastValueRef.current !== value) {
    const val =
      value !== undefined
        ? formatForInput(parseValue(String(value)))
        : undefined;
    if (val !== currentValueRef.current) {
      currentValueRef.current = val;
    }
  }
  lastValueRef.current = value;

  // the final string value for the input field
  const formattedValue = inputState
    ? currentValueRef.current || ""
    : formatForDisplay(parseValue(currentValueRef.current));

  return (
    <Input
      {...passThrough}
      type={InputType.Text}
      inputMode={maxFractionDigits === 0 ? "numeric" : "decimal"}
      maxlength={16}
      ref={forwardedRef}
      value={formattedValue}
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      onFocus={onFocus}
      onBlur={onBlur}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onPaste={onPaste}
    />
  );
});
