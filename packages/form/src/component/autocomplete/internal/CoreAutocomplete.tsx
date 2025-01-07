import "@ui5/webcomponents-icons/dist/search.js";
import "@ui5/webcomponents/dist/features/InputSuggestions.js";

import {
  Input,
  InputDomRef,
  InputPropTypes,
  SuggestionItem,
  SuggestionItemPropTypes,
  Ui5CustomEvent,
} from "@ui5/webcomponents-react";
import {
  IInputSuggestionItem,
  InputSelectionChangeEventDetail,
} from "@ui5/webcomponents/dist/Input";
import {
  KeyboardEvent,
  MutableRefObject,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";

import { useLatestRef } from "../../../hook/useLatestRef";
import type { DefaultAutoCompleteOption } from "../../AutoCompleteModel";
import { triggerSubmitOnEnter } from "../../util";
import { startsWithPerTerm } from "./filter";

export type { DefaultAutoCompleteOption };

export type CreatedAutoCompleteOption = DefaultAutoCompleteOption & {
  __isNew__: true;
};

/**
 * Base Props of Input we really care about. Reduced prop set of the UI5 Component <code>Input</code>
 * => Controlled Component
 */
export type CoreAutocompleteProps<T extends {} = DefaultAutoCompleteOption> =
  Omit<
    InputPropTypes,
    | "children"
    | "value"
    | "name"
    | "onChange"
    | "onInput"
    | "showSuggestions"
    | "type"
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
    value?: string;

    /**
     * Suggestions to show
     */
    items: Array<T>;

    /**
     * Render <code>SuggestionItem</code>s from UI5.
     */
    itemProps?: (item: T) => Partial<SuggestionItemPropTypes>;

    /**
     * Controls which text is used to display options.
     * Used by suggestions, if not overridden
     * by <code>renderSuggestion</code>
     *
     * By default the prop <code>label</code> is used.
     * You can pass either a string, which represents a different prop or a render function.
     */
    getItemLabel: (item: T) => string;

    /**
     * Controls which value / key is used to identify an option.
     * This is used by suggestions, if not overridden
     * by <code>renderSuggestion</code>.
     *
     * By default the prop <code>value</code> is used.
     * You can pass either a string, which represents a different prop or a render function.
     */
    getItemValue: (item: T) => string;

    /**
     * Change handler that allows to access the new inputValue
     *
     * @param inputValue updated input value
     * @param event event that lead to that change
     */
    onInputChange?: (
      inputValue: string,
      event: Ui5CustomEvent<InputDomRef>
    ) => void;

    /**
     * Change handler that allows to access the new suggested item
     * Note: will be called in the future without item to reset the value
     *
     * @param suggestionValue
     */
    onValueChange?: (value?: string, item?: T) => void;

    /**
     * Custom filter method to display only items matching the search term.
     *
     * Note: provide null to disable filtering
     *
     * @param suggestionValue
     */
    filterItem?: null | ((inputValue: string, item: T) => boolean);

    /**
     * If user doesn't select a suggested value, her input will be lost if this prop is set to true.
     * Default: true;
     */
    forceSelection?: boolean;
  };

export const CoreAutocomplete = forwardRef<InputDomRef, CoreAutocompleteProps>(
  (props, forwardedRef) => {
    const {
      items = [],
      itemProps,
      getItemLabel,
      getItemValue,
      onInputChange,
      onValueChange,
      value,
      inputValue,
      filterItem,
      ...otherProps
    } = props;

    const valueRef = useLatestRef<string | undefined>(value);
    const suggestionRef = useLatestRef<Array<DefaultAutoCompleteOption>>(items);
    const itemRef = useRef<IInputSuggestionItem | null>(null);

    const customItemFilter: (
      inputValue: string,
      item: DefaultAutoCompleteOption
    ) => boolean = useMemo(() => {
      if (filterItem === null) {
        return () => true;
      }

      if (filterItem != null) {
        return filterItem;
      }

      return (inputValue: string, item: DefaultAutoCompleteOption) =>
        startsWithPerTerm(inputValue ?? "", getItemLabel(item) ?? "");
    }, [filterItem, getItemLabel]);

    const filteredItems: Array<DefaultAutoCompleteOption> = useMemo(
      () =>
        items.filter(
          (item) =>
            (item as CreatedAutoCompleteOption).__isNew__ ||
            customItemFilter(inputValue ?? "", item)
        ),
      [inputValue, items, customItemFilter]
    );

    const handleSelectionChange = useCallback(
      (event: Ui5CustomEvent<InputDomRef, InputSelectionChangeEventDetail>) => {
        // we need to store last selected item see migration guide: https://sap.github.io/ui5-webcomponents/docs/migration-guides/to-version-2/#ui5-input
        itemRef.current = event.detail.item;
      },
      []
    );

    const handleChange = useCallback(
      (event: Ui5CustomEvent<InputDomRef>) => {
        if (onValueChange != null) {
          const itemValue = itemRef.current?.dataset.id;

          if (itemValue == null) {
            // no item was selected -> remove value
            onValueChange(undefined, undefined);
          } else {
            const item = suggestionRef.current.find(
              (item) => getItemValue(item) === itemValue
            );

            if (item) {
              onValueChange(item.value, item);
            }
          }
        }
      },
      [onValueChange, getItemValue]
    );

    const resetSuggenstionItem = useCallback(() => {
      // reset last selected item
      itemRef.current = null;

      // workaround: ensure trigger of selection change event
      // @ts-ignore
      inputRef.current.previousValue = "";
      // @ts-ignore
      inputRef.current.valueBeforeItemSelection = "";
    }, []);

    const handleInput = useCallback(
      (event: Ui5CustomEvent<InputDomRef>) => {
        const currentValue = (event.currentTarget as InputDomRef).value;

        if (onInputChange != null) {
          onInputChange(currentValue, event);
        }

        if (onValueChange != null) {
          const item = suggestionRef.current.find(
            (item) => getItemLabel(item) === currentValue
          );

          if (!item && valueRef.current != null) {
            onValueChange(undefined, undefined);
          }
        }
      },
      [onInputChange]
    );

    const handleKeyPress = useCallback((event: KeyboardEvent<HTMLElement>) => {
      triggerSubmitOnEnter(event);
    }, []);

    let shownValue: string = inputValue ?? "";

    if (value != null) {
      const item = items.find((item) => getItemValue(item) === value);
      shownValue = item == null ? value : getItemLabel(item);
    }

    // store input ref for internal usage
    const inputRef = useRef<InputDomRef>() as MutableRefObject<InputDomRef>;
    useImperativeHandle(forwardedRef, () => inputRef.current);

    return (
      <Input
        {...otherProps}
        value={shownValue}
        ref={inputRef}
        showSuggestions={true}
        onInput={handleInput}
        onChange={handleChange}
        onOpen={resetSuggenstionItem}
        onSelectionChange={handleSelectionChange}
        onKeyPress={handleKeyPress}
      >
        {filteredItems.map((item) => {
          const props: Partial<SuggestionItemPropTypes> = itemProps
            ? itemProps(item)
            : {};

          const value = getItemValue(item);
          const label = props.text || getItemLabel(item);

          return (
            <SuggestionItem
              {...props}
              key={value}
              data-id={value}
              text={label}
            />
          );
        })}
      </Input>
    );
  }
);
