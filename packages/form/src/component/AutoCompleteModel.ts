import { InputPropTypes } from "@ui5/webcomponents-react/webComponents/Input";
import { MultiInputPropTypes } from "@ui5/webcomponents-react/webComponents/MultiInput";
import { SuggestionItemPropTypes } from "@ui5/webcomponents-react/webComponents/SuggestionItem";
import { TokenPropTypes } from "@ui5/webcomponents-react/webComponents/Token";
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
 * Props of Input we really care about. Reduced prop set of the UI5 Component <code>Input</code>
 */
export type CustomInputProps<T> = Pick<
  InputPropTypes,
  | "style"
  | "className"
  | "id"
  | "placeholder"
  | "valueState"
  | "valueStateMessage"
  | "onBlur"
  | "required"
  | "disabled"
  | "readonly"
> & {
  /**
   * Name of the input.
   */
  name?: string;
  /**
   * Controls which text is used to display options.
   * Used by suggestions, if not overridden
   * by <code>renderSuggestion</code>
   *
   * By default the prop <code>label</code> is used.
   * You can pass either a string, which represents a different prop or a render function.
   */
  itemLabel?: string | ((value: T) => string);

  /**
   * Controls which value / key is used to identify an option.
   * This is used by suggestions, if not overridden
   * by <code>renderSuggestion</code>.
   *
   * By default the prop <code>value</code> is used.
   * You can pass either a string, which represents a different prop or a render function.
   */
  itemValue?: string | ((value: T) => string);

  /**
   * Minimum number of characters before search is triggered.
   * Default: 1.
   */
  minCharsForSearch?: number;

  /**
   * The search method to use in order to generate suggestions.
   * This method is fired on every key press.
   *
   * @param searchTerm the entered value
   * @returns Promise of the items to use for showing suggestions
   */
  onSearch: (searchTerm: string) => Promise<AutoCompleteOptions<T>>;

  /**
   * Render <code>SuggestionItem</code>s from UI5.
   */
  suggestionProps?: (value: T) => Partial<CustomSuggestionProps>;

  initialSuggestions?: Array<T>;

  /**
   * Render <code>Token</code>s from UI5.
   */
  renderValue?: (value: T) => Partial<CustomTokenProps>;
};

/**
 * Props of MultiInput we really care about. Reduced prop set of the UI5 Component <code>MultiInput</code>.
 *
 * 1. Pick common & wanted HTML props (className, style, ...)
 * 2. Reduce MultiInputProps by excluding all generic HTML props (ExcludedTypes statement)
 * 3. Omit from reduced MultiInputProps those UI5 props we don't want (tokens, value, ...)
 * 4. WORKAROUND: the omit statement is wrapped as partial so that react-docgen-typescript won't document those attributes as required
 */
export type CustomMultiInputProps<T> = CustomInputProps<T> &
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

/**
 * The options must be an array of something
 */
export type AutoCompleteOptions<T = DefaultAutoCompleteOption> = Array<T>;

export type DefaultAutoCompleteOption = { label: string; value: string };

/**
 * Props of SuggestionItem which renders one suggestion option for the AutoComplete.
 *
 * Reduced prop set of the UI5 component <code>SuggestionItem</code>.
 * Prop <code>value</code> has been added.
 */
export type CustomSuggestionProps = { value: string } & Pick<
  SuggestionItemPropTypes,
  | "description"
  | "icon"
  | "iconEnd"
  | "image"
  | "additionalText"
  | "additionalTextState"
  | "text"
  | "type"
>;

/**
 * Props of Token which renders one value (selected option) for the MultiAutoComplete.
 *
 * Reduced prop set of the UI5 Component <code>Token</code>.
 * Prop <code>value</code> has been added.
 */
export type CustomTokenProps = { value: string } & Pick<
  TokenPropTypes,
  | "text"
  | "className"
  | "id"
  | "style"
  | "closeIcon"
  | "readonly"
  | "selected"
  | "onSelect"
>;
