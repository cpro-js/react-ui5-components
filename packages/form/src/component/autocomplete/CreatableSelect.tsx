import { InputDomRef } from "@ui5/webcomponents-react";
import { ReactElement, Ref, forwardRef } from "react";

import { SharedHtmlPropsWithKeyInput } from "../SharedHtmlProps";
import {
  UseCreatableAdditionalProps,
  useCreatable,
} from "./hooks/useCreatable";
import { useInputState } from "./hooks/useInputState";
import {
  UseItemAdditionalProps,
  UseItemModelManagedPropKeys,
  useItemModel,
} from "./hooks/useItemModel";
import {
  CoreAutocomplete,
  CoreAutocompleteProps,
  DefaultAutoCompleteOption,
} from "./internal/CoreAutocomplete";

export type CreatableSelectProps<
  TModel extends {} = DefaultAutoCompleteOption
> = SharedHtmlPropsWithKeyInput<InputDomRef> &
  Omit<
    Pick<
      CoreAutocompleteProps<TModel>,
      | "name"
      | "value"
      | "items"
      | "filterItem"
      | "onInputChange"
      | "onValueChange"
      | "forceSelection"
      | "icon"
      | "valueStateMessage"
      | "onSelectionChange"
      | "disabled"
      | "maxlength"
      | "noTypeahead"
      | "placeholder"
      | "readonly"
      | "required"
      | "showClearIcon"
      | "valueState"
    >,
    "inputValue" | UseItemModelManagedPropKeys
  > &
  UseItemAdditionalProps<TModel> &
  UseCreatableAdditionalProps<TModel>;

export const CreatableSelect = forwardRef<InputDomRef, CreatableSelectProps>(
  (props, forwardedRef) => {
    const itemModelProps = useItemModel<
      DefaultAutoCompleteOption,
      typeof props
    >(props);
    const stateProps = useInputState<
      DefaultAutoCompleteOption,
      typeof itemModelProps
    >(itemModelProps);
    const creatableProps = useCreatable<
      DefaultAutoCompleteOption,
      typeof stateProps
    >(stateProps);

    return <CoreAutocomplete ref={forwardedRef} {...creatableProps} />;
  }
) as <T extends {} = DefaultAutoCompleteOption>(
  p: CreatableSelectProps<T> & { ref?: Ref<HTMLInputElement | undefined> }
) => ReactElement;
