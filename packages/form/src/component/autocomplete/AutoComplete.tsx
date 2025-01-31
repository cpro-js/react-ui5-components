import { InputDomRef } from "@ui5/webcomponents-react";
import { ReactElement, Ref, forwardRef } from "react";

import { GlobalHtmlKeyInputElementProps } from "../GlobalHtmlElementProps";
import {
  UseAsyncAdditionalProps,
  UseAsyncManagedPropKeys,
  useAsync,
} from "./hooks/useAsync";
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

export type AutoCompleteProps<TModel extends {} = DefaultAutoCompleteOption> =
  GlobalHtmlKeyInputElementProps<InputDomRef> &
    Omit<
      Pick<
        CoreAutocompleteProps<TModel>,
        | "name"
        | "value"
        | "onInputChange"
        | "onValueChange"
        | "forceSelection"
        | "icon"
        | "valueStateMessage"
        | "disabled"
        | "maxlength"
        | "noTypeahead"
        | "placeholder"
        | "readonly"
        | "required"
        | "showClearIcon"
        | "valueState"
      >,
      "inputValue" | UseAsyncManagedPropKeys | UseItemModelManagedPropKeys
    > &
    UseAsyncAdditionalProps<TModel> &
    UseItemAdditionalProps<TModel>;

export const AutoComplete = forwardRef<InputDomRef, AutoCompleteProps>(
  (props, forwardedRef) => {
    const itemModelProps = useItemModel<
      DefaultAutoCompleteOption,
      typeof props
    >(props);

    const asyncProps = useAsync<
      DefaultAutoCompleteOption,
      typeof itemModelProps
    >(itemModelProps);
    const stateProps = useInputState<
      DefaultAutoCompleteOption,
      typeof asyncProps
    >(asyncProps);

    return <CoreAutocomplete ref={forwardedRef} {...stateProps} />;
  }
) as <T extends {} = DefaultAutoCompleteOption>(
  p: AutoCompleteProps<T> & { ref?: Ref<HTMLInputElement | undefined> }
) => ReactElement;
