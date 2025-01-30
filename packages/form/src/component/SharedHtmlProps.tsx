import {
  CSSProperties,
  ClipboardEventHandler,
  FocusEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
} from "react";

/**
 * Common HTML props that every web component uses
 */
export interface SharedHtmlProps<T> {
  style?: CSSProperties | undefined;
  className?: string | undefined;
  slot?: string | undefined;
  id?: string | undefined;
  title?: string | undefined;
  onFocus?: FocusEventHandler<T> | undefined;
  onBlur?: FocusEventHandler<T> | undefined;
  onMouseOver?: MouseEventHandler<T> | undefined;
  onMouseOut?: MouseEventHandler<T> | undefined;
  onMouseEnter?: MouseEventHandler<T> | undefined;
  onMouseLeave?: MouseEventHandler<T> | undefined;
  onMouseMove?: MouseEventHandler<T> | undefined;
}

/**
 * Common HTML props that every input web component uses
 */
export interface SharedHtmlPropsWithKeyInput<T> extends SharedHtmlProps<T> {
  onKeyDown?: KeyboardEventHandler<T> | undefined;
  /** @deprecated Use `onKeyUp` or `onKeyDown` instead */
  onKeyPress?: KeyboardEventHandler<T> | undefined;
  onKeyUp?: KeyboardEventHandler<T> | undefined;
  onPaste?: ClipboardEventHandler<T> | undefined;
}
