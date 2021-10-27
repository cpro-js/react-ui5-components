import { ReactElement, Ref, forwardRef } from "react";

import {
  UseAsyncAdditionalProps,
  UseAsyncManagedPropKeys,
  useAsync,
} from "./hooks/useAsync";
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

export type CreatableAutocompleteProps<TModel = DefaultAutoCompleteOption> =
  Omit<
    CoreAutocompleteProps<TModel>,
    UseAsyncManagedPropKeys | UseItemModelManagedPropKeys
  > &
    UseAsyncAdditionalProps<TModel> &
    UseItemAdditionalProps<TModel> &
    UseCreatableAdditionalProps<TModel>;

export const CreatableAutocomplete = forwardRef<
  HTMLInputElement,
  CreatableAutocompleteProps
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
  const creatableProps = useCreatable<
    DefaultAutoCompleteOption,
    typeof stateProps
  >(stateProps);

  return <CoreAutocomplete ref={forwardedRef} {...creatableProps} />;
}) as <T = DefaultAutoCompleteOption>(
  p: CreatableAutocompleteProps<T> & {
    ref?: Ref<HTMLInputElement | undefined>;
  }
) => ReactElement;
