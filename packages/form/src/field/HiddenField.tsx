import {
  FC,
  MutableRefObject,
  forwardRef,
  useImperativeHandle,
  useRef,
} from "react";
import { useController } from "react-hook-form";

import { FormFieldElement } from "./types";

export interface HiddenFieldProps {
  name: string;
  // Note: using disabled to hide values within submit data is not supported in react hook form, yet
  // see https://github.com/react-hook-form/react-hook-form/issues/2826
  // disabled?: boolean;
}

export const HiddenField: FC<HiddenFieldProps> = forwardRef<
  FormFieldElement,
  HiddenFieldProps
>(({ name }, forwardedRef) => {
  const { field } = useController({ name });

  // store input ref for intenral usage
  const internalRef = useRef<HTMLInputElement>(null);
  // forward outer ref to custom element
  useImperativeHandle(forwardedRef, () => ({
    focus() {
      if (internalRef.current != null) {
        internalRef.current.focus();
      }
    },
  }));
  // forward field ref to stored internal input ref
  useImperativeHandle(field.ref, () => internalRef.current);

  return (
    <input
      {...field}
      ref={internalRef as MutableRefObject<HTMLInputElement>}
      type="hidden"
      value={field.value == null ? "" : field.value}
    />
  );
});
