/**
 * MultiAutoComplete
 * Uses the MultiInput of ui5-webcomponents-react.
 */
import "@ui5/webcomponents/dist/features/InputSuggestions";

import {
  MultiInput,
  MultiInputPropTypes,
} from "@ui5/webcomponents-react/dist/MultiInput";
import { SuggestionItem } from "@ui5/webcomponents-react/dist/SuggestionItem";
import { Token } from "@ui5/webcomponents-react/dist/Token";
import { Ui5CustomEvent } from "@ui5/webcomponents-react/interfaces/Ui5CustomEvent";
import { Component, KeyboardEvent, ReactNode, SyntheticEvent } from "react";

import {
  AutoCompleteOptions,
  CustomMultiInputProps,
  CustomSuggestionProps,
  CustomTokenProps,
  DefaultAutoCompleteOption,
} from "./AutoCompleteModel";

// UI5 Event Types
type TokenDeleteEvent = Ui5CustomEvent<HTMLInputElement, { token: ReactNode }>;
interface FocusOutEvent<T = Element> extends SyntheticEvent<T, FocusEvent> {
  relatedTarget: EventTarget | null;
  target: EventTarget & T;
}

/**
 * The complete set of properties as union (last won wins => our new defined props always win)
 */
export type MultiAutoCompleteProps<T = DefaultAutoCompleteOption> =
  CustomMultiInputProps & {
    /**
     * The list of selected options.
     *
     * Also provide fitting intialSuggestionItems when using controlled state to show labels instead of plain values.
     */
    values: Array<string>;

    /**
     * Controls which text is used to display options.
     * Used by suggestions as well as values (tokens), if not overridden
     * by <code>renderValue</code> and <code>renderSuggestion</code>
     *
     * By default the prop <code>label</code> is used.
     * You can pass either a string, which represents a different prop or a render function.
     */
    optionLabel?: string | ((value: T) => string);

    /**
     * Controls which value / key is used to identify an option.
     * This is used by suggestions as well as values (tokens), if not overridden
     * by <code>renderValue</code> and <code>renderSuggestion</code>.
     *
     * By default the prop <code>label</code> is used.
     * You can pass either a string, which represents a different prop or a render function.
     */
    optionValue?: string | ((value: T) => string);

    /**
     * The search method to use in order to generate suggestions.
     * This method is fired on every key press.
     *
     * @param searchTerm the entered value
     * @returns Promise of the items to use for showing suggestions
     */
    onSearch: (searchTerm: string) => Promise<AutoCompleteOptions<T>>;

    /**
     * Main method to get notified about changes to values, i.e. deletion or addition of values.
     * Consumer always gets the complete list of values.
     *
     * @param values the list of selected values
     * @param suggestionValues the list of the complete items
     */
    onSelectionChange?: (
      values: Array<string>,
      suggestionValues?: AutoCompleteOptions<T>
    ) => void;

    onAdd?: (value: T) => void;
    onRemove?: (value: T) => void;

    /**
     * Render <code>Token</code>s from UI5.
     */
    renderValue?: (value: T) => Partial<CustomTokenProps>;
    /**
     * Render <code>SuggestionItem</code>s from UI5.
     */
    suggestionProps?: (value: T) => Partial<CustomSuggestionProps>;

    initialSuggestions?: Array<T>;

    onChange?: (
      event: Ui5CustomEvent<HTMLInputElement>,
      values: Array<string>
    ) => void;
  };

const DEFAULT_LABEL_PROP = "label";
const DEFAULT_VALUE_PROP = "value";

const KEY_BACKSPACE = "Backspace";
const KEY_LEFT = "ArrowLeft";
const KEY_RIGHT = "ArrowRight";

const TAG_NAME_TOKEN = "UI5-TOKEN";

export class MultiAutoComplete<T> extends Component<MultiAutoCompleteProps<T>> {
  state = {
    values: this.props.values || [],
    suggestions: [] as Array<T>,
    selectedItems: {} as Record<string, T>,
  };

  constructor(props: MultiAutoCompleteProps<T>) {
    super(props);
    const { initialSuggestions, values } = props;

    if (initialSuggestions) {
      this.state.suggestions = initialSuggestions;
    }
    if (values) {
      for (const value of values) {
        const item = this.findItemFromSuggestions(value);
        if (item) {
          this.state.selectedItems[value] = item;
        }
      }
    }
  }

  onInput = (event: Ui5CustomEvent<HTMLInputElement>) => {
    const { onSearch } = this.props;
    const value = (event.currentTarget as MultiInputPropTypes).value;

    // no searching
    if (!value || !value.trim()) {
      this.setState({ suggestions: [] });
      return;
    }

    if (onSearch) {
      onSearch(value).then((data) => {
        const { values } = this.state;

        const withoutSelected = data.filter((d) => {
          const dataId = this.retrieveOptionValue(d);
          return !values.includes(dataId);
        });

        this.setState({ suggestions: withoutSelected });
      });
    }
  };

  onSelect = (event: Ui5CustomEvent<HTMLInputElement, { item: ReactNode }>) => {
    const { onAdd, onChange, onSelectionChange } = this.props;
    const { values } = this.state;
    const id = (event.detail.item as unknown as HTMLElement).dataset.id;
    const toAdd = this.findItemFromSuggestions(id);
    // nothing to do
    if (!id || !toAdd) {
      return;
    }

    const selected = [...values, id];
    const selectedItems = { ...this.state.selectedItems, ...{ [id]: toAdd } };

    if (onAdd) {
      onAdd(toAdd);
    }
    if (onChange) {
      onChange(event as Ui5CustomEvent<HTMLInputElement>, selected);
    }
    if (onSelectionChange) {
      onSelectionChange(selected, Object.values(selectedItems));
    }

    // clear the input field => added value is rendered as token elsewhere
    event.target.value = "";
    this.setState({
      suggestions: [],
      values: selected,
      selectedItems: selectedItems,
    });
  };

  findItemFromSuggestions = (value?: string) => {
    if (value) {
      return this.state.suggestions.find(
        (suggestion) => this.retrieveOptionValue(suggestion) === value
      );
    }
  };

  onDelete = (event: TokenDeleteEvent) => {
    const { onRemove, onChange, onSelectionChange } = this.props;
    const { values, selectedItems } = this.state;
    const id = (event.detail.token as unknown as HTMLElement).dataset.id;

    // nothing to do
    if (!id) {
      return;
    }

    const toDelete = selectedItems[id];
    const newValues = values.filter((value) => value !== id);
    const newItems = { ...selectedItems };
    delete newItems[id];

    if (onRemove && toDelete) {
      onRemove(toDelete);
    }
    if (onChange) {
      onChange(event as Ui5CustomEvent<HTMLInputElement>, newValues);
    }
    if (onSelectionChange) {
      onSelectionChange(newValues, Object.values(newItems));
    }
    this.setState({ values: newValues, selectedItems: newItems });
  };

  onBlur = (event: FocusOutEvent<HTMLInputElement>) => {
    event.target.value = "";
  };

  onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const multiInput = event.currentTarget;

    const val = multiInput.value;
    // @ts-ignore
    const tokens: Array<HTMLElement> = multiInput.getSlottedNodes("tokens");
    const isKeyLeft = event.key === KEY_LEFT;
    const isKeyRight = event.key === KEY_RIGHT;
    const isBackSpace = event.key === KEY_BACKSPACE;

    if (val || !tokens || !tokens.length) {
      return;
    }

    const focusedElement = document.activeElement as HTMLElement;
    const isTagFocussed =
      focusedElement && focusedElement.tagName === TAG_NAME_TOKEN;
    let elementToFocus = null;

    // allow for token navigation via arrow left / right keys
    if (isTagFocussed && (isKeyLeft || isKeyRight)) {
      const id = focusedElement.dataset.id;
      const selected = tokens.indexOf(focusedElement);

      if (selected > -1) {
        // console.log("focused: ", id, selected);

        const newIndex = isKeyLeft ? selected - 1 : selected + 1;
        if (newIndex < 0 || newIndex >= tokens.length) {
          // console.log("input should be focussed!");
          // multiInput.focus()
          elementToFocus = multiInput;
        } else {
          // console.log("focussing token ", newIndex);
          elementToFocus = tokens[newIndex];
        }
      }
    }

    // default handling
    if (!isTagFocussed && (isBackSpace || isKeyLeft || isKeyRight)) {
      const index = isKeyRight ? 0 : tokens.length - 1;
      elementToFocus = tokens[index];
      // console.log("focussing token: ", index);
    }

    if (elementToFocus !== null) {
      event.preventDefault();
      elementToFocus.focus();
    }
  };

  retrieveOptionLabel = (value: T) => {
    const { optionLabel } = this.props;
    if (optionLabel) {
      if (typeof optionLabel === "string") {
        //@ts-ignore
        return value[optionLabel];
      } else if (typeof optionLabel === "function") {
        return optionLabel(value);
      }
    }

    //@ts-ignore
    return value[DEFAULT_LABEL_PROP] || "---";
  };

  retrieveOptionValue = (value: T) => {
    const { optionValue } = this.props;

    if (optionValue) {
      if (typeof optionValue === "string") {
        //@ts-ignore
        return value[optionValue];
      } else if (typeof optionValue === "function") {
        return optionValue(value);
      }
    }

    //@ts-ignore
    return value[DEFAULT_VALUE_PROP];
  };

  renderTokens = () => {
    const { renderValue } = this.props;
    const { values, selectedItems } = this.state;
    const rendered = values.map((selected) => {
      const item = selectedItems[selected];
      let finalValue: string = selected;
      let finalLabel: string = selected;
      let props = {};

      if (item) {
        const { value, ...props }: Partial<CustomTokenProps> = renderValue
          ? renderValue(item)
          : {};

        finalValue = value || this.retrieveOptionValue(item);
        finalLabel = props.text || this.retrieveOptionLabel(item);
      }

      return (
        <Token
          {...props}
          key={finalValue}
          data-id={finalValue}
          text={finalLabel}
        />
      );
    });

    return <>{rendered}</>;
  };

  renderSuggestions = () => {
    const { suggestionProps } = this.props;
    const { suggestions } = this.state;

    return suggestions.map((suggestion: T) => {
      const props: Partial<CustomSuggestionProps> = suggestionProps
        ? suggestionProps(suggestion)
        : {};

      const value = props.value || this.retrieveOptionValue(suggestion);
      const label = props.text || this.retrieveOptionLabel(suggestion);
      const text = label;

      return (
        <SuggestionItem {...props} key={value} data-id={value} text={text} />
      );
    });
  };

  render() {
    const {
      values,
      optionLabel,
      optionValue,
      onChange,
      onSearch,
      onSelectionChange,
      onAdd,
      onRemove,
      suggestionProps,
      renderValue,
      ...originalProps
    } = this.props;

    return (
      <MultiInput
        {...originalProps}
        showSuggestions={true}
        tokens={this.renderTokens()}
        onTokenDelete={this.onDelete}
        onInput={this.onInput}
        onSuggestionItemSelect={this.onSelect}
        onBlur={this.onBlur}
        onKeyDown={this.onKeyDown}
      >
        {this.renderSuggestions()}
      </MultiInput>
    );
  }
}
