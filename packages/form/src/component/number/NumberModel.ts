import {
  InputDomRef,
  InputPropTypes,
  Ui5CustomEvent,
} from "@ui5/webcomponents-react";
import { KeyboardEvent } from "react";

import { GetNumberWarningMessage } from "./helper/NumberWarningMessage";

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
    | "onSelectionChange"
    | "onChange"
    | "onKeyUp"
  > {
  /**
   * The initial value, if any.
   * Can also be used to modify the value of the number field.
   */
  value?: number;
  /**
   * Modified onChange method, which also supplies the consumer with the parsed number value.
   */
  onChange?: (
    event: Ui5CustomEvent<InputDomRef>,
    value: number | undefined
  ) => void;
  /**
   * Convenience method which behaves like onChange, but only provides the current value as number.
   * Fired when the value has changed and the user leaves the input field.
   */
  onValue?: (value?: number) => void;
  /**
   * Modified onKeyUp method, which also supplies the consumer with the parsed number value.
   */
  onKeyUp?: (
    event: KeyboardEvent<HTMLInputElement>,
    value: number | undefined
  ) => void;
  /**
   * Locale to use for currency formatting style.
   * Might have been provided by NumberI18nProvider, otherwise must be set manually via this attribute.
   * This attribute takes precedence, if also provided by NumberI18nProvider.
   */
  locale?: string;
  /**
   * Warning messages are shown by default, when user input has been blocked, modified, or reset.
   * Disable or enable that those messages are shown.
   */
  showNumberWarningMessages?: boolean;
  /**
   * Provide the content of shown warning messages.
   * Required for proper internationalization.
   *
   *
   */
  getNumberWarningMessage?: GetNumberWarningMessage;
}

/**
 * Configuration options for the number display.
 * E.g. useGrouping=true will show thousand separator, when the input field is not focussed.
 */
export interface NumberDisplayConfig
  extends Pick<
    Intl.NumberFormatOptions,
    | "minimumIntegerDigits"
    | "minimumFractionDigits"
    | "maximumFractionDigits"
    | "minimumSignificantDigits"
    | "maximumSignificantDigits"
    | "useGrouping"
  > {}

/**
 * Configuration options for the number input.
 * E.g. maxFractionDigits=0 will allow no fractions as input
 */
export interface NumberInputConfig
  extends Pick<NumberDisplayConfig, "maximumFractionDigits"> {
  /**
   * Min number allowed for input.
   * If user enters a lower value it will automatically be set to this min value.
   *
   * Must be between (including) MAX_NEGATIVE_INTEGER and 1:
   * any other restriction on input would be impractical.
   *
   * Min = 0 wouldn't allow any negative numbers.
   */
  minimumValue?: number;
  /**
   * Max number allowed for input.
   * If user enters a higher value it will automatically be set to this max value.
   *
   * Must be between (including) -1 and MAX_POSITIVE_INTEGER:
   * any other restriction on input would be impractical.
   *
   * Max = 0 would only allow for negative numbers
   * Max = 999 would allow any number up to three digits
   */
  maximumValue?: number;
}
