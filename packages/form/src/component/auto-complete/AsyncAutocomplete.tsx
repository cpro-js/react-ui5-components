import { ReactElement, Ref, forwardRef } from "react";
import { Simplify } from "type-fest";

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

export type AsyncAutocompleteProps<TModel = DefaultAutoCompleteOption> =
  Simplify<
    Omit<
      CoreAutocompleteProps<TModel>,
      UseAsyncManagedPropKeys | UseItemModelManagedPropKeys
    > &
      UseAsyncAdditionalProps<TModel> &
      UseItemAdditionalProps<TModel>
  >;

export const AsyncAutocomplete = forwardRef<
  HTMLInputElement,
  AsyncAutocompleteProps
>((props, forwardedRef) => {
  const itemModelProps = useItemModel<DefaultAutoCompleteOption, typeof props>(
    props
  );

  const asyncProps = useAsync<DefaultAutoCompleteOption, typeof itemModelProps>(
    itemModelProps
  );
  const stateProps = useInputState<
    DefaultAutoCompleteOption,
    typeof asyncProps
  >(asyncProps);

  return <CoreAutocomplete ref={forwardedRef} {...stateProps} />;
}) as <T = DefaultAutoCompleteOption>(
  p: AsyncAutocompleteProps<T> & { ref?: Ref<HTMLInputElement | undefined> }
) => ReactElement;
