import { DefaultAutoCompleteOption } from "../AutoCompleteModel";
import { UseCreatableProps, useCreatable } from "./hooks/useCreatable";
import { useInputState } from "./hooks/useInputState";
import { UseItemModelProps, useItemModel } from "./hooks/useItemModel";
import {
  CoreAutocomplete,
  CoreAutocompleteProps,
} from "./internal/CoreAutocomplete";

export type CreatableAutocompleteProps<TModel = DefaultAutoCompleteOption> =
  UseCreatableProps<TModel> &
    UseItemModelProps<TModel> &
    CoreAutocompleteProps<TModel>;

export const CreatableAutocomplete = (props: CreatableAutocompleteProps) => {
  // @ts-ignore TODO Check
  const itemModelProps = useItemModel(props);
  // @ts-ignore TODO Check
  const stateProps = useInputState(itemModelProps);
  const creatableProps = useCreatable(stateProps);

  // @ts-ignore TODO Check
  return <CoreAutocomplete {...creatableProps} />;
};
