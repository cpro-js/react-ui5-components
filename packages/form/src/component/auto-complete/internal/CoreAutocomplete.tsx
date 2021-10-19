import "@ui5/webcomponents-icons/dist/search.js";
import "@ui5/webcomponents/dist/features/InputSuggestions.js";

import { Input, SuggestionItem } from "@ui5/webcomponents-react";
import { Ui5CustomEvent } from "@ui5/webcomponents-react/interfaces/Ui5CustomEvent";
import { InputPropTypes } from "@ui5/webcomponents-react/webComponents/Input";
import {
  KeyboardEvent,
  ReactNode,
  forwardRef,
  useCallback,
  useEffect,
  useRef,
} from "react";

import {
  CustomSuggestionProps,
  DefaultAutoCompleteOption,
} from "../../AutoCompleteModel";
import { getItemAttribute, triggerSubmitOnEnter } from "../../util";

/**
 * Base Props of Input we really care about. Reduced prop set of the UI5 Component <code>Input</code>
 * => Controlled Component
 */
export type CoreAutocompleteProps<T = DefaultAutoCompleteOption> = Pick<
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
   * Value shown on the input
   */
  inputValue?: string;

  /**
   * Selected suggested item
   */
  value?: T;

  /**
   * Suggestions to show
   */
  items: Array<T>;

  /**
   * Render <code>SuggestionItem</code>s from UI5.
   */
  getItemProps?: (value: T) => Partial<CustomSuggestionProps>;

  /**
   * Controls which text is used to display options.
   * Used by suggestions, if not overridden
   * by <code>renderSuggestion</code>
   *
   * By default the prop <code>label</code> is used.
   * You can pass either a string, which represents a different prop or a render function.
   */
  getItemLabel: (value: T) => string;

  /**
   * Controls which value / key is used to identify an option.
   * This is used by suggestions, if not overridden
   * by <code>renderSuggestion</code>.
   *
   * By default the prop <code>value</code> is used.
   * You can pass either a string, which represents a different prop or a render function.
   */
  getItemValue: (value: T) => string;

  /**
   * Change handler that allows to access the new inputValue
   *
   * @param inputValue updated input value
   * @param event event that lead to that change
   */
  onInputChange?: (
    inputValue: string,
    event: Ui5CustomEvent<HTMLInputElement>
  ) => void;

  /**
   * Change handler that allows to access the new suggested item
   * Note: will be called in the future without item to reset the value
   *
   * @param suggestionValue
   */
  onValueChange?: (suggestionValue?: T) => void;
};

export const CoreAutocomplete = forwardRef<
  HTMLInputElement,
  CoreAutocompleteProps
>((props, forwardedRef) => {
  const {
    items,
    getItemProps,
    getItemLabel,
    getItemValue,
    onInputChange,
    onValueChange,
    value,
    inputValue,
    ...otherProps
  } = props;

  const suggestionRef = useRef<Array<DefaultAutoCompleteOption>>(items);
  useEffect(() => {
    suggestionRef.current = items;
  }, [items]);

  const handleSuggestionItemSelect = useCallback(
    (event: Ui5CustomEvent<HTMLInputElement, { item: ReactNode }>) => {
      if (onValueChange == null) {
        return;
      }

      const element = event.detail.item as unknown as HTMLElement & {
        text: string;
      };
      if (element?.dataset?.id != null) {
        const itemValue = element?.dataset?.id;
        const item = suggestionRef.current.find(
          (item) => getItemAttribute(item, getItemValue) === itemValue
        );
        if (item) {
          onValueChange(item);
        }
      }
    },
    [onValueChange, getItemValue]
  );

  const handleInput = useCallback(
    (event: Ui5CustomEvent<HTMLInputElement>) => {
      if (onInputChange != null) {
        const currentValue = (event.currentTarget as HTMLInputElement).value;

        onInputChange(currentValue, event);
      }
    },
    [onInputChange]
  );

  const handleKeyPress = useCallback((event: KeyboardEvent<HTMLElement>) => {
    triggerSubmitOnEnter(event);
  }, []);

  return (
    <Input
      {...otherProps}
      value={inputValue}
      ref={forwardedRef}
      showSuggestions={true}
      onInput={handleInput}
      onSuggestionItemSelect={handleSuggestionItemSelect}
      onKeyPress={handleKeyPress}
    >
      {items.map((item) => {
        const props: Partial<CustomSuggestionProps> = getItemProps
          ? getItemProps(item)
          : {};

        // todo fix type definition of itemValue & itemLabel
        const value = props.value || getItemAttribute(item, getItemValue);
        const label = props.text || getItemAttribute(item, getItemLabel);

        return (
          <SuggestionItem
            {...props}
            key={value}
            data-id={value}
            text={label}
            additionalText={(item as any).__isNew__ ? "create" : undefined}
          />
        );
      })}
    </Input>
  );
});
