import {
  InputPropTypes,
  MultiInputPropTypes,
  SuggestionItemPropTypes,
  TokenPropTypes,
} from "@ui5/webcomponents-react";
import { HTMLAttributes } from "react";

/**
 * Util Type: Generate new prop set by exclduing one interface from another.
 *
 * Example: type AutoComplete = ExcludedTypes<MultiInput, HTMLAttributes<HTMLElement>>
 * => Use MultiInput as base and remove all generic HTMLAttributes
 *
 * See: https://www.dslemay.com/blog/2020/05/25/typescript-utility-types-part-3-extract-exclude-and-nonnullable
 */
export type ExcludedTypes<T, U> = {
  [K in Exclude<keyof T, keyof U>]: T[K];
};

/**
 * Props of Token which renders one value (selected option) for the AutoComplete.
 *
 * Reduced prop set of the UI5 Component <code>Token</code>.
 * Prop <code>value</code> has been added.
 */
export type CustomTokenProps = { value: string } & Pick<
  TokenPropTypes,
  "text" | "className" | "id" | "style" | "closeIcon" | "selected" | "onSelect"
>;

export type CustomInputProps = Pick<
  InputPropTypes,
  "style" | "className" | "id" | "placeholder"
>;

/**
 * Props of MultiInput we really care about. Reduced prop set of the UI5 Component <code>MultiInput</code>.
 *
 * 1. Pick common & wanted HTML props (className, style, ...)
 * 2. Reduce MultiInputProps by excluding all generic HTML props (ExcludedTypes statement)
 * 3. Omit from reduced MultiInputProps those UI5 props we don't want (tokens, value, ...)
 * 4. WORKAROUND: the omit statement is wrapped as partial so that react-docgen-typescript won't document those attributes as required
 */
export type CustomMultiInputProps = Pick<
  MultiInputPropTypes,
  "style" | "className" | "id" | "placeholder"
> &
  Partial<
    Omit<
      ExcludedTypes<MultiInputPropTypes, HTMLAttributes<HTMLElement>>,
      | "tokens"
      | "value"
      | "showSuggestions"
      | "onTokenDelete"
      | "onSuggestionItemSelect"
    >
  >;

export type DefaultAutoCompletOption = { label: string; value: string };
