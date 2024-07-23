import { HTMLAttributes } from "react";

//Picked HtmlAttributes that every Component uses
export type SharedHtmlProps = Pick<
  HTMLAttributes<HTMLElement>,
  | "style"
  | "className"
  | "id"
  | "title"
  | "onBlur"
  | "onFocus"
  | "onMouseOver"
  | "onMouseOut"
  | "onMouseEnter"
  | "onMouseLeave"
  | "onMouseMove"
>;

// pick only those props which we do care about
export type SharedHtmlPropsWithKeyInput = Pick<
  HTMLAttributes<HTMLElement>,
  | "style"
  | "className"
  | "id"
  | "placeholder"
  | "title"
  | "onKeyUp"
  | "onKeyDown"
  | "onBlur"
  | "onFocus"
  | "onPaste"
  | "onMouseOver"
  | "onMouseOut"
  | "onMouseEnter"
  | "onMouseLeave"
  | "onMouseMove"
>;
