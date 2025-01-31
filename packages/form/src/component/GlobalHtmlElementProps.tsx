import {
  CSSProperties,
  ClipboardEventHandler,
  FocusEventHandler,
  KeyboardEventHandler,
  MouseEventHandler,
} from "react";

/**
 * HTML element properties which apply globally,
 * also for any WebComponent.
 */
export interface GlobalHtmlElementProps<T> {
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
 * HTML element properties which apply to all input elements with key input.
 */
export interface GlobalHtmlKeyInputElementProps<T>
  extends GlobalHtmlElementProps<T> {
  onKeyDown?: KeyboardEventHandler<T> | undefined;
  /** @deprecated Use `onKeyUp` or `onKeyDown` instead */
  onKeyPress?: KeyboardEventHandler<T> | undefined;
  onKeyUp?: KeyboardEventHandler<T> | undefined;
  onPaste?: ClipboardEventHandler<T> | undefined;
}
