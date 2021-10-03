import "@ui5/webcomponents/dist/features/InputSuggestions.js";

import { Input, SuggestionItem } from "@ui5/webcomponents-react";
import { Ui5CustomEvent } from "@ui5/webcomponents-react/interfaces/Ui5CustomEvent";
import { InputPropTypes } from "@ui5/webcomponents-react/webComponents/Input";
import { Component, ReactNode } from "react";

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

const DEFAULT_LABEL_PROP = "label";
const DEFAULT_VALUE_PROP = "value";

export class AutoComplete<T> extends Component<AutoCompleteProps<T>> {
  state = {
    value: this.props.value || "",
    suggestions: this.props.initialSuggestions || ([] as Array<T>),
  };

  onInput = (event: Ui5CustomEvent<HTMLInputElement>) => {
    const { onSearch, onChange, onSelectionChange: onSelect } = this.props;
    const value = (event.currentTarget as InputPropTypes).value;

    // no searching
    if (!value || !value.trim()) {
      if (onChange) {
        onChange(event, "");
      }
      if (onSelect) {
        onSelect("");
      }
      this.setState({ suggestions: [], value: "" });
      return;
    }

    if (onSearch) {
      onSearch(value).then((data) => {
        this.setState({ suggestions: data });
      });
    }
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

    const labelSelected = this.getLabelForValue(selected);

    return (
      <Input
        {...originalProps}
        value={labelSelected}
        showSuggestions={true}
        onInput={this.onInput}
        onSuggestionItemSelect={this.onSelect}
      >
        {this.renderSuggestions()}
      </Input>
    );
  }
}
