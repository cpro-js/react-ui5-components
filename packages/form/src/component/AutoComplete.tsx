import "@ui5/webcomponents/dist/features/InputSuggestions.js";

import { Input, SuggestionItem } from "@ui5/webcomponents-react";
import { debounce } from "@ui5/webcomponents-react-base/dist/Utils";
import { Ui5CustomEvent } from "@ui5/webcomponents-react/interfaces/Ui5CustomEvent";
import { InputPropTypes } from "@ui5/webcomponents-react/webComponents/Input";
import { Component, FocusEvent, ReactNode } from "react";

import {
  AutoCompleteOptions,
  CustomInputProps,
  CustomSuggestionProps,
  DefaultAutoCompleteOption,
} from "./AutoCompleteModel";

export type AutoCompleteProps<T = DefaultAutoCompleteOption> =
  CustomInputProps & {
    /**
     * Name of the input.
     */
    name?: string;

    /**
     * The selected value.
     */
    value?: string;

    renderValue?: (value: T) => string;

    /**
     * Controls which text is used to display options.
     * Used by suggestions, if not overridden
     * by <code>renderSuggestion</code>
     *
     * By default the prop <code>label</code> is used.
     * You can pass either a string, which represents a different prop or a render function.
     */
    optionLabel?: string | ((value: T) => string);

    /**
     * Controls which value / key is used to identify an option.
     * This is used by suggestions, if not overridden
     * by <code>renderSuggestion</code>.
     *
     * By default the prop <code>value</code> is used.
     * You can pass either a string, which represents a different prop or a render function.
     */
    optionValue?: string | ((value: T) => string);

    placeholder?: string;

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
     * Main method to get notified about any change to the selection.
     *
     * @param value the current value
     * @param suggestionValue the current item
     */
    onSelectionChange?: (value: string, suggestionValue?: any) => void;

    /**
     * Render <code>SuggestionItem</code>s from UI5.
     */
    suggestionProps?: (value: T) => Partial<CustomSuggestionProps>;

    initialSuggestions?: Array<T>;

    onChange?: (
      event: Ui5CustomEvent<HTMLInputElement>,
      value?: string
    ) => void;
  };

const DEBOUNCE_RATE = 400;
const DEFAULT_LABEL_PROP = "label";
const DEFAULT_VALUE_PROP = "value";

export class AutoComplete<T> extends Component<AutoCompleteProps<T>> {
  searchTerm: string = "";
  searching: boolean = false;

  state = {
    value: this.props.value || "",
    suggestions: this.props.initialSuggestions || ([] as Array<T>),
  };

  search = debounce((searchTerm: string, hasMinChars: boolean) => {
    const { value } = this.state;
    const { onSearch } = this.props;

    // there is one case where we shouldn't search, after a selection has been made.
    // First a search is not neccessary, second it can be harmful: The label which is put
    // into the input field after selection, doesn't need to be a proper & matching search term
    // => only search if the search term doesn't match the label of the current value
    const selectedLabel = value ? this.getLabelForValue(value) : undefined;
    const hasBeenSelected = selectedLabel === searchTerm;

    if (!hasBeenSelected && hasMinChars) {
      this.searching = true;
      onSearch(searchTerm).then((suggestions) => {
        this.searching = false;
        this.setState({ suggestions });
      });
    }
  }, DEBOUNCE_RATE);

  onInput = (event: Ui5CustomEvent<HTMLInputElement>) => {
    const {
      onChange,
      onSelectionChange: onSelect,
      minCharsForSearch,
    } = this.props;
    const { value } = this.state;
    const currentValue = (event.currentTarget as InputPropTypes).value;
    this.searchTerm = currentValue ? currentValue.trim() : "";
    const hasMinChars = this.searchTerm.length >= (minCharsForSearch || 1);

    if (!this.searchTerm || !hasMinChars) {
      // value existed, now its empty => trigger change
      if (value) {
        if (onChange) {
          onChange(event, "");
        }
        if (onSelect) {
          onSelect("");
        }
      }

      // no value => clear everything
      this.setState({ suggestions: [], value: "" });
    }

    // call debounced search function
    // note: we always need to call this function, because of debouncing & empty values
    this.search(this.searchTerm, hasMinChars);
  };

  onSelect = (event: Ui5CustomEvent<HTMLInputElement, { item: ReactNode }>) => {
    const { onChange, onSelectionChange: onSelect } = this.props;
    const id = (event.detail.item as unknown as HTMLElement).dataset.id;
    const selectedValue = id || "";
    const selectedItem = this.findItemFromSuggestions(selectedValue);
    const labelSelected = selectedItem
      ? this.retrieveOptionLabel(selectedItem)
      : selectedValue;

    // set input value to selected label (fallback: value)
    event.target.value = labelSelected;

    if (onChange) {
      onChange(event as Ui5CustomEvent<HTMLInputElement>, selectedValue);
    }
    if (onSelect) {
      onSelect(selectedValue, selectedItem);
    }
    this.setState({ value: selectedValue });
  };

  onBlur = (event: FocusEvent<HTMLInputElement>) => {
    const { value } = this.state;
    const labelFromValue = this.getLabelForValue(value);
    const currentValue = event.currentTarget.value;

    if (labelFromValue !== currentValue) {
      event.currentTarget.value = labelFromValue;
    }
  };

  findItemFromSuggestions = (value?: string) => {
    if (value) {
      return this.state.suggestions.find(
        (suggestion) => this.retrieveOptionValue(suggestion) === value
      );
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
    return value[DEFAULT_LABEL_PROP];
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

  getLabelForValue(value?: string) {
    if (value) {
      const item = this.findItemFromSuggestions(value);
      return item ? this.retrieveOptionLabel(item) : value;
    }
    return "";
  }

  render() {
    const {
      optionLabel,
      optionValue,
      onChange,
      onSearch,
      onSelectionChange: onSelect,
      suggestionProps,
      renderValue,
      value,
      ...originalProps
    } = this.props;
    const { value: selected } = this.state;

    const labelSelected = this.searchTerm ?? this.getLabelForValue(selected);

    return (
      <Input
        {...originalProps}
        value={labelSelected}
        showSuggestions={true}
        onInput={this.onInput}
        onSuggestionItemSelect={this.onSelect}
        onBlur={this.onBlur}
      >
        {this.renderSuggestions()}
      </Input>
    );
  }
}
