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
