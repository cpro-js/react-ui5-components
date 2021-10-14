import { useContext } from "react";

import { FormActions } from "../field/types";
import { FormActionContext } from "./context/FormActionContext";

export function useFormActions<
  FormValues extends {}
>(): FormActions<FormValues> {
  return useContext(FormActionContext);
}
