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
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";

import { getFormatter } from "../helper/NumberFormatter";
import { NumberParser, getParser } from "../helper/NumberParser";
import { triggerSubmitOnEnter } from "../util";

/**
 * We're only interested in those keys which change our number value
 * and these consist of a single char.
 * Control keys / special keys get a descriptive name, i.e. longer than 1 char.
 *
 * Special handling:
 * - key combinations (pressing STRG/ALT simultaneously)
 *
 * @param event the keyboard event
 * @returns
 */
function isKeyRelevant(event: KeyboardEvent<HTMLInputElement>) {
  return event.key.length === 1 && !event.ctrlKey && !event.altKey;
}

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
    locale,
    onValue,
    displayConfig,
    inputConfig,
    max,
    onKeyDown: onKeyDownOriginal,
    onKeyUp: onKeyUpOriginal,
    onFocus: onFocusOriginal,
    onBlur: onBlurOriginal,
    onPaste: onPasteOriginal,
    ...passThrough
  } = props;

  const isFocusRef = useRef(false);
  const isPasteRef = useRef(false);
  const parser = useMemo(() => getParser(locale), [locale]);

  const [inputState, setInputState] = useState(false);
  // const [currentValue, setCurrentValue] = useState(value);

  // Format numbers for input
  const formatForInput = useMemo(() => {
    const isCurrency = inputConfig.style === "currency";
    const conf: Intl.NumberFormatOptions = isCurrency
      ? {
          ...inputConfig,
          currency: "USD",
          currencyDisplay: "code",
          minimumFractionDigits: 0,
        }
      : inputConfig;

    const formatter = getFormatter(locale, {
      ...conf,
      useGrouping: false,
    });

    return !isCurrency
      ? formatter.format
      : (val?: number) => formatter.format(val).replace(/USD[\s]+/, "");
  }, [inputConfig, locale]);

  // Format numbers for display
  const formatForDisplay = useMemo(() => {
    const isCurrency = displayConfig.style === "currency";
    const conf: Intl.NumberFormatOptions = isCurrency
      ? {
          ...displayConfig,
          currency: "USD",
          currencyDisplay: "code",
        }
      : displayConfig;

    // number display: grouping is false by default
    const formatter = getFormatter(locale, {
      useGrouping: false,
      ...conf,
    });

    return !isCurrency
      ? formatter.format
      : (val?: number) => formatter.format(val).replace(/USD[\s]*/, "");
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
    value !== undefined ? String(parseValue(String(value))) : undefined
  );

  /**
   * Prevent invalid data, e.g. not a number.
   */
  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      const originalValue = event.currentTarget.value;

      if (isKeyRelevant(event)) {
        // note: newValue might not be the real current value,
        // since selection & current cursor position are not taken into account
        const newValue = originalValue + event.key;
        const value = parser.parse(newValue);

        // validations
        const isNan = newValue && value === undefined;

        // block invalid content
        if (isNan) {
          console.log("blocking!!!", newValue, value);
          event.preventDefault();
          event.stopPropagation();
          return;
        }
      }

      // allow consumers to have access to onKeyDown too
      if (onKeyDownOriginal) {
        onKeyDownOriginal(event);
      }
    },
    [parser, onKeyDownOriginal]
  );

  /**
   * Sets the current value, enables submit via enter and triggers events.
   */
  const onKeyUp = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      const originalValue = event.currentTarget.value;
      const value = parseValue(originalValue); //parser.parse(originalValue, true);

      if (isKeyRelevant(event) || isPasteRef.current) {
        isPasteRef.current = false;

        const isValueChange = parser.parse(originalValue) !== value;
        const maxLength = formatForDisplay(value).replace(
          parser.getGroupingSeparator(),
          ""
        ).length;
        const isTooManyZeros = originalValue.length > maxLength;

        if (isValueChange) {
          currentValueRef.current = formatForInput(value);
          event.currentTarget.value = currentValueRef.current;
          return;
        }
        if (isTooManyZeros) {
          event.currentTarget.value = currentValueRef.current || "";
          return;
        }
      }

      // set the current value
      currentValueRef.current = originalValue;

      // extra method to provide the value as number
      if (onValue) {
        onValue(value);
      }

      // allow for submit via enter
      triggerSubmitOnEnter(event);

      // allow consumers to have access to onKeyUp too
      if (onKeyUpOriginal) {
        onKeyUpOriginal(event);
      }
    },
    [parser, parseValue, onValue, onKeyUpOriginal]
  );

  const triggerInputState = useCallback(() => {
    setInputState(true);
  }, [setInputState]);

  const triggerDisplayState = useCallback(() => {
    if (!isFocusRef.current) {
      setInputState(false);
    }
  }, [setInputState]);

  const onFocus = useCallback(
    (event) => {
      isFocusRef.current = true;
      triggerInputState();

      if (onFocusOriginal) {
        onFocusOriginal(event);
      }
    },
    [onFocusOriginal]
  );

  const onBlur = useCallback(
    (event) => {
      isFocusRef.current = false;
      triggerDisplayState();

      if (onBlurOriginal) {
        onBlurOriginal(event);
      }
    },
    [onBlurOriginal]
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

  const formattedValue = inputState
    ? currentValueRef.current || ""
    : formatForDisplay(parseValue(currentValueRef.current));

  return (
    <Input
      {...passThrough}
      type={inputState ? InputType.Text : InputType.Text}
      ref={forwardedRef}
      value={formattedValue}
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      onFocus={onFocus}
      onBlur={onBlur}
      onMouseEnter={triggerInputState}
      onMouseOut={triggerDisplayState}
      onPaste={onPaste}
    />
  );
});
