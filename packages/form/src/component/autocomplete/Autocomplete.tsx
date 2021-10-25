import { ReactElement, Ref, forwardRef } from "react";

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

export type AutocompleteProps<TModel = DefaultAutoCompleteOption> = Omit<
  CoreAutocompleteProps<TModel>,
  UseItemModelManagedPropKeys
> &
  UseItemAdditionalProps<TModel>;

export const Autocomplete = forwardRef<HTMLInputElement, AutocompleteProps>(
  (props, forwardedRef) => {
    const itemModelProps = useItemModel<
      DefaultAutoCompleteOption,
      typeof props
    >(props);
    const stateProps = useInputState<
      DefaultAutoCompleteOption,
      typeof itemModelProps
    >(itemModelProps);

    return <CoreAutocomplete ref={forwardedRef} {...stateProps} />;
  }
) as <T = DefaultAutoCompleteOption>(
  p: AutocompleteProps<T> & { ref?: Ref<HTMLInputElement | undefined> }
) => ReactElement;
