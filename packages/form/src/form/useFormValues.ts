import {
  FieldPath,
  FieldPathValue,
  FieldPathValues,
  FieldValues,
  useWatch,
} from "react-hook-form";

import { PartialFormValues } from "../field/types";

export const useFormValues: {
  <TFieldValues extends FieldValues = {}>(): PartialFormValues<TFieldValues>;
  <
    TFieldValues extends FieldValues = {},
    TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
  >(
    name: TFieldName
  ): FieldPathValue<TFieldValues, TFieldName>;
  <
    TFieldValues extends FieldValues = {},
    TFieldNames extends readonly FieldPath<TFieldValues>[] = readonly FieldPath<TFieldValues>[]
  >(
    names: TFieldNames
  ): FieldPathValues<TFieldValues, TFieldNames>;
} = (name?: any): any => {
  return useWatch({ name: name }); // subscribe to re-render
};
