export enum WarningMessageTypes {
  MODIFIED = "MODIFIED",
  BLOCKED_WHITESPACE = "BLOCKED_WHITE_SPACE",
  BLOCKED_NEGATIVE_NUMBER = "BLOCKED_NEGATIVE_NUMBER",
  BLOCKED_FRACTION = "BLOCKED_FRACTION",
  BLOCKED_NOT_A_NUMBER = "BLOCKED_NOT_A_NUMBER",
  RESET_NOT_A_NUMBER = "RESET_NOT_A_NUMBER",
  MODIFIED_MAX_FRACTION_DIGITS = "MODIFIED_MAX_FRACTION_DIGITS",
  MODIFIED_MIN_NUMBER = "MODIFIED_MIN_NUMBER",
  MODIFIED_MAX_NUMBER = "MODIFIED_MAX_NUMBER",
}

export interface NumberWarningMessage {
  type: WarningMessageTypes;
  discardedValue: string;
}

/**
 * Function to provide content for the warning messages shown, when
 * user input has been blocked or modified.
 *
 * @param type one of the predefined message types
 * @param discardedValue the user input which has been discarded
 */
export type GetNumberWarningMessage = (
  type: WarningMessageTypes,
  discardedValue: string
) => string;

export const defaultNumberWarningMessageGetter: GetNumberWarningMessage = (
  type,
  discardedValue
) => {
  switch (type) {
    case WarningMessageTypes.BLOCKED_WHITESPACE:
      return `Your input has been blocked: No whitespace allowed!`;
    case WarningMessageTypes.BLOCKED_NEGATIVE_NUMBER:
      return `Your input has been blocked: No negative numbers allowed!`;
    case WarningMessageTypes.BLOCKED_FRACTION:
      return `Your input [${discardedValue}] has been blocked: Only integers / whole numbers are allowed.`;
    case WarningMessageTypes.BLOCKED_NOT_A_NUMBER:
      return `Your input [${discardedValue}] has been blocked: Would have been an invalid number.`;
    case WarningMessageTypes.RESET_NOT_A_NUMBER:
      return `Input has been reset to last value: [${discardedValue}] is not a valid number.`;
    case WarningMessageTypes.MODIFIED_MAX_FRACTION_DIGITS:
      return `Rounding has been applied: [${discardedValue}] exceeds maximum number of fraction digits.`;
    case WarningMessageTypes.MODIFIED_MIN_NUMBER:
      return `Input has been set to the allowed min value: [${discardedValue}] falls below minimum value.`;
    case WarningMessageTypes.MODIFIED_MAX_NUMBER:
      return `Input has been set to the allowed max value: [${discardedValue}] exceeds maximum value.`;

    default:
      return `Your input has been modified. Discarded value: ${discardedValue}`;
  }
};
