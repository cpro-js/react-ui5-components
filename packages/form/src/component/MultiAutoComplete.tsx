/**
 * MultiAutoComplete
 * Uses the MultiInput of ui5-webcomponents-react.
 */
import "@ui5/webcomponents/dist/features/InputSuggestions";

import { debounce } from "@ui5/webcomponents-react-base/dist/Utils";
import {
  MultiInput,
  MultiInputPropTypes,
} from "@ui5/webcomponents-react/dist/MultiInput";
import { SuggestionItem } from "@ui5/webcomponents-react/dist/SuggestionItem";
import { Token } from "@ui5/webcomponents-react/dist/Token";
import { Ui5CustomEvent } from "@ui5/webcomponents-react/interfaces/Ui5CustomEvent";
import { Component, FocusEvent, KeyboardEvent, SyntheticEvent } from "react";

import {
  AutoCompleteOptions,
  CustomMultiInputProps,
  CustomSuggestionProps,
  CustomTokenProps,
  DefaultAutoCompleteOption,
} from "./AutoCompleteModel";
import {
  DEBOUNCE_RATE,
  DEFAULT_LABEL_PROP,
  DEFAULT_VALUE_PROP,
} from "./common/CommonSelection";

// UI5 Event Types
type TokenDeleteEvent = Ui5CustomEvent<
  HTMLInputElement,
  { token: HTMLElement }
>;
interface FocusOutEvent<T = Element> extends SyntheticEvent<T, FocusEvent> {
  relatedTarget: EventTarget | null;
  target: EventTarget & T;
}

/**
 * The complete set of properties as union (last won wins => our new defined props always win)
 */
export type MultiAutoCompleteProps<T = DefaultAutoCompleteOption> =
  CustomMultiInputProps<T> & {
    /**
     * The list of selected options.
     *
     * Also provide fitting intialSuggestionItems when using controlled state to show labels instead of plain values.
     */
    values: Array<string>;

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

    onChange?: (
      event: Ui5CustomEvent<HTMLInputElement>,
      values: Array<string>
    ) => void;
  };

const KEY_BACKSPACE = "Backspace";
const KEY_LEFT = "ArrowLeft";
const KEY_RIGHT = "ArrowRight";

const TAG_NAME_TOKEN = "UI5-TOKEN";

export class MultiAutoComplete<T> extends Component<MultiAutoCompleteProps<T>> {
  searchTerm: string = "";
  searching: boolean = false;

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

  search = debounce((searchTerm: string, hasMinChars: boolean) => {
    const { selectedItems } = this.state;
    const { onSearch } = this.props;

    // there is one case where we shouldn't search, after a selection has been made.
    // First a search is not neccessary, second it can be harmful: The label which is put
    // into the input field after selection, doesn't need to be a proper & matching search term
    // => only search if the search term doesn't match the label of the current value
    const hasBeenSelected = Object.values(selectedItems)
      .map((item) => this.retrieveItemLabel(item))
      .includes(searchTerm);

    if (!hasBeenSelected && hasMinChars) {
      this.searching = true;

      onSearch(searchTerm).then((suggestions) => {
        this.searching = false;
        const { values } = this.state;

        const withoutSelected = suggestions.filter((s) => {
          const dataId = this.retrieveItemValue(s);
          return !values.includes(dataId);
        });

        this.setState({ suggestions: withoutSelected });
      });
    }

    if (onSearch) {
      onSearch(this.searchTerm).then((data) => {});
    }
  }, DEBOUNCE_RATE);

  onInput = (event: Ui5CustomEvent<HTMLInputElement>) => {
    const { minCharsForSearch } = this.props;
    const currentValue = (event.currentTarget as MultiInputPropTypes).value;
    this.searchTerm = currentValue ? currentValue.trim() : "";
    const hasMinChars = this.searchTerm.length >= (minCharsForSearch || 1);

    // no value => clear suggestions
    if (!this.searchTerm || !hasMinChars) {
      this.setState({ suggestions: [] });
    }

    this.search(this.searchTerm, hasMinChars);
  };

  onSelect = (
    event: Ui5CustomEvent<HTMLInputElement, { item: HTMLElement }>
  ) => {
    const { onAdd, onChange, onSelectionChange } = this.props;
    const { values } = this.state;
    const id = event.detail.item.dataset.id;
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

  onBlur = (event: FocusEvent<HTMLInputElement>) => {
    event.target.value = "";
  };

  findItemFromSuggestions = (value?: string) => {
    if (value) {
      return this.state.suggestions.find(
        (suggestion) => this.retrieveItemValue(suggestion) === value
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
          // TODO: UI5 MultiInput doesn't handle the focusevent as it should be => no searching possibles
          // @see https://github.com/SAP/ui5-webcomponents/issues/3865
          // multiInput.focus()
          // elementToFocus = multiInput;
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

  retrieveItemLabel = (value: T) => {
    const { itemLabel } = this.props;
    if (itemLabel) {
      if (typeof itemLabel === "string") {
        //@ts-ignore
        return value[itemLabel];
      } else if (typeof itemLabel === "function") {
        return itemLabel(value);
      }
    }

    //@ts-ignore
    return value[DEFAULT_LABEL_PROP] || "---";
  };

  retrieveItemValue = (value: T) => {
    const { itemValue } = this.props;

    if (itemValue) {
      if (typeof itemValue === "string") {
        //@ts-ignore
        return value[itemValue];
      } else if (typeof itemValue === "function") {
        return itemValue(value);
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

        finalValue = value || this.retrieveItemValue(item);
        finalLabel = props.text || this.retrieveItemLabel(item);
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

      const value = props.value || this.retrieveItemValue(suggestion);
      const label = props.text || this.retrieveItemLabel(suggestion);
      const text = label;

      return (
        <SuggestionItem {...props} key={value} data-id={value} text={text} />
      );
    });
  };

  render() {
    const {
      values,
      itemLabel,
      itemValue,
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
