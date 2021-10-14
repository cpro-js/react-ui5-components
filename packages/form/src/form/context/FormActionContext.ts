import { createContext } from "react";

import { FormActions } from "../../field/types";

const noop = () => undefined;

export const FormActionContext = createContext<FormActions<any>>({
  setErrors: noop,
  setValues: noop,
  reset: noop,
  clear: noop,
  submit: noop,
});
