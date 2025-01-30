import { HTMLAttributes } from "react";

//Picked HtmlAttributes that every Component uses
export interface SharedHtmlProps
  extends Pick<
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
  > {}

// pick only those props which we do care about
export interface SharedHtmlPropsWithKeyInput
  extends SharedHtmlProps,
    Pick<
      HTMLAttributes<HTMLElement>,
      "onKeyUp" | "onKeyDown" | "onBlur" | "onFocus" | "onPaste"
    > {}
