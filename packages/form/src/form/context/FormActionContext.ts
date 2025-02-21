import { createContext } from "react";

import { FormActions } from "../../field/types";

const noop = () => {
  throw new Error("Form isn't initialized yet");
};

export const FormActionContext = createContext<FormActions<any>>({
  focus: noop,
  setErrors: noop,
  getValues: noop,
  setValues: noop,
  reset: noop,
  clear: noop,
  submit: noop,
});
