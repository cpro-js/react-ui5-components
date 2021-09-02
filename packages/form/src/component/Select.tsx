import { ComboBox, ComboBoxItem } from "@ui5/webcomponents-react";
import { Ui5CustomEvent } from "@ui5/webcomponents-react/interfaces/Ui5CustomEvent";
import { ComboBoxPropTypes } from "@ui5/webcomponents-react/webComponents/ComboBox";
import { FC, KeyboardEvent, forwardRef, useCallback } from "react";

import { triggerSubmitOnEnter } from "./util";

const findLabel = (
  items: Array<SelectItem>,
  value?: string | number
): string => {
  if (value) {
    const itemByIndex = items.find((item) => item.value === value);
    if (itemByIndex) {
      return itemByIndex.label;
    }
  }
  return "";
};

export interface SelectItem {
  value: string | number;
  label: string;
}

export interface SelectProps
  extends Omit<
    ComboBoxPropTypes,
    | "name"
    | "value"
    | "filterValue"
    | "children"
    | "onSelectionChange"
    | "onChange"
  > {
  name?: string;
  value?: string | number;
  items?: Array<SelectItem>;
  addEmptyOption?: boolean;
  onSelectionChange?: (
    event: Ui5CustomEvent<
      HTMLInputElement,
      {
        item: HTMLElement;
      }
    >,
    value?: string | number
  ) => void;
  onChange?: (
    event: Ui5CustomEvent<HTMLInputElement>,
    value?: string | number
  ) => void;
}

export const Select: FC<SelectProps> = forwardRef<
  HTMLInputElement | undefined,
  SelectProps
>((props, forwardedRef) => {
  const {
    name,
    items = [],
    addEmptyOption,
    onSelectionChange,
    onChange,
    onKeyDown,
    onKeyPress,
    value,
    ...otherProps
  } = props;

  const handleSelectionChange = useCallback(
    (event: Ui5CustomEvent<HTMLInputElement, { item: any }>) => {
      if (onSelectionChange != null) {
        const index = event.detail.item.dataset.index;
        const value = index == null ? undefined : items[Number(index)]?.value;
        onSelectionChange(event, value);
      }
    },
    [items, onSelectionChange]
  );

  const handleChange = useCallback(
    (event: Ui5CustomEvent<HTMLInputElement>) => {
      if (onChange != null) {
        const item = (
          Array.from(event.target.childNodes) as Array<HTMLElement>
        ).find((item) => (item as HTMLOptionElement).selected);

        const index = item?.dataset.index;
        const value = index == null ? undefined : items[Number(index)]?.value;

        onChange(event, value);
      }
    },
    [items, onChange]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLElement>) => {
      // Fix: As long as the user is typing within the input ensure that no one else can catch these events
      // Background: Storybook is catching these events and triggering their shortcuts
      event.stopPropagation();
      if (onKeyDown != null) {
        onKeyDown(event);
      }
    },
    [onKeyDown]
  );

  const handleKeyPress = useCallback(
    (event: KeyboardEvent<HTMLElement>) => {
      // Workaround: Webcomponents catches enter -> need to submit manually
      // see https://github.com/SAP/ui5-webcomponents/pull/2855/files
      triggerSubmitOnEnter(event);
      if (onKeyPress != null) {
        onKeyPress(event);
      }
    },
    [onKeyPress]
  );

  const text = findLabel(items, value);

  return (
    <>
      <ComboBox
        {...otherProps}
        ref={forwardedRef}
        value={text}
        onSelectionChange={handleSelectionChange}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onKeyPress={handleKeyPress}
      >
        {addEmptyOption && <ComboBoxItem text="---" />}
        {items.map((item, index) => (
          // index is the most unique value, value could be non-unique when providing numbers and strings (react keys are strings)
          <ComboBoxItem key={index} text={item.label} data-index={index} />
        ))}
      </ComboBox>
    </>
  );
});
